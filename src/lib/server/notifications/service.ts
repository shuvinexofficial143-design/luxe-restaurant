import { secureIdentifier } from "@/lib/server/security/admin-token";
import { sendResendEmail } from "@/lib/server/email/resend";
import { sendWhatsAppText } from "@/lib/server/whatsapp/cloud";
import { enqueueJob } from "@/lib/server/jobs/service";
import { supabaseNotificationQueue } from "@/lib/server/supabase/notification-queue";
import { supabaseCommunicationPreferences } from "@/lib/server/supabase/communication-preferences";
import {
  communicationAllowed,
} from "@/lib/server/communications/consent";
import {
  renderEmailNotification,
  renderWhatsAppNotification,
} from "./templates";
import type {
  NotificationChannel,
} from "./types";
import type {
  CommunicationCategory,
} from "@/lib/server/communications/types";
import { ApiError } from "@/lib/server/api/errors";

export async function enqueueNotification(input: {
  customerId?: string;
  channel: NotificationChannel;
  category?: CommunicationCategory;
  recipient: string;
  templateKey: string;
  subjectLabel?: string;
  payload: Record<string, unknown>;
  runAfter?: string;
}) {
  const notificationId =
    secureIdentifier("NOTIFY");

  const notification =
    await supabaseNotificationQueue.insert({
      id: notificationId,
      customer_id: input.customerId || null,
      channel: input.channel,
      category:
        input.category || "TRANSACTIONAL",
      subject_label:
        input.subjectLabel || null,
      recipient: input.recipient,
      template_key: input.templateKey,
      payload_json: input.payload,
      status: "QUEUED",
      attempts: 0,
      max_attempts: 6,
      run_after:
        input.runAfter ||
        new Date().toISOString(),
      provider_message_id: null,
      last_error: null,
      consent_checked_at: null,
      sent_at: null,
    } as never);

  await enqueueJob({
    id: secureIdentifier("JOB"),
    jobType: "NOTIFICATION_SEND",
    payload: { notificationId },
    maxAttempts: 6,
    runAfter:
      notification.run_after,
  });

  return notification;
}

export async function processNotification(
  notificationId: string
) {
  const notification =
    await supabaseNotificationQueue.findById(
      notificationId
    );

  if (!notification) {
    throw new ApiError(
      "NOTIFICATION_NOT_FOUND",
      "Notification was not found.",
      404
    );
  }

  if (
    notification.status === "SENT"
  ) {
    return {
      alreadySent: true,
      providerMessageId:
        notification.provider_message_id,
    };
  }

  const category =
    ((notification as unknown as {
      category?: CommunicationCategory;
    }).category ||
      "TRANSACTIONAL") as CommunicationCategory;

  const preferences =
    notification.customer_id
      ? await supabaseCommunicationPreferences.findForCustomer(
          notification.customer_id
        )
      : null;

  const decision =
    communicationAllowed({
      customerId:
        notification.customer_id,
      channel:
        notification.channel,
      category,
      preferences,
    });

  if (!decision.allowed) {
    await supabaseNotificationQueue.patch(
      notification.id,
      {
        status: "DEAD",
        last_error: `Consent blocked: ${decision.reason}`,
        consent_checked_at:
          new Date().toISOString(),
      } as never
    );

    return {
      alreadySent: false,
      blockedByConsent: true,
      reason: decision.reason,
    };
  }

  await supabaseNotificationQueue.patch(
    notification.id,
    {
      status: "PROCESSING",
      attempts:
        Number(
          notification.attempts || 0
        ) + 1,
      last_error: null,
      consent_checked_at:
        new Date().toISOString(),
    } as never
  );

  try {
    let providerMessageId = "";

    if (
      notification.channel ===
      "EMAIL"
    ) {
      const message =
        renderEmailNotification(
          notification.template_key,
          notification.payload_json
        );

      const result =
        await sendResendEmail({
          to: notification.recipient,
          ...message,
        });

      providerMessageId =
        result.id;
    } else {
      const text =
        renderWhatsAppNotification(
          notification.template_key,
          notification.payload_json
        );

      const result =
        await sendWhatsAppText({
          to: notification.recipient,
          text,
        });

      providerMessageId =
        result.messages?.[0]
          ?.id || "";
    }

    await supabaseNotificationQueue.patch(
      notification.id,
      {
        status: "SENT",
        provider_message_id:
          providerMessageId || null,
        sent_at:
          new Date().toISOString(),
        last_error: null,
      }
    );

    return {
      alreadySent: false,
      blockedByConsent: false,
      providerMessageId,
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Notification send failed.";

    await supabaseNotificationQueue.patch(
      notification.id,
      {
        status: "FAILED",
        last_error:
          message.slice(0, 2000),
      }
    ).catch(() => undefined);

    throw error;
  }
}

export async function markNotificationDead(
  notificationId: string,
  error: string
) {
  await supabaseNotificationQueue.patch(
    notificationId,
    {
      status: "DEAD",
      last_error:
        error.slice(0, 2000),
    }
  );
}
