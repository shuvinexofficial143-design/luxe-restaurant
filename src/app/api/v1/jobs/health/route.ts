import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { supabaseAsyncJobs } from "@/lib/server/supabase/async-jobs";
import { supabaseWebhookEvents } from "@/lib/server/supabase/webhook-events";
import { supabaseNotificationQueue } from "@/lib/server/supabase/notification-queue";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(
      request,
      "security.view"
    );

    const [jobs, webhooks, notifications] =
      await Promise.all([
        supabaseAsyncJobs.listRecent(200),
        supabaseWebhookEvents.listRecent(200),
        supabaseNotificationQueue.listRecent(200),
      ]);

    return apiSuccess(
      {
        jobs: {
          queued: jobs.filter(
            (item) => item.status === "QUEUED"
          ).length,
          running: jobs.filter(
            (item) => item.status === "RUNNING"
          ).length,
          failed: jobs.filter(
            (item) => item.status === "FAILED"
          ).length,
          dead: jobs.filter(
            (item) => item.status === "DEAD"
          ).length,
          succeeded: jobs.filter(
            (item) => item.status === "SUCCEEDED"
          ).length,
        },
        webhooks: {
          total: webhooks.length,
          processed: webhooks.filter(
            (item) =>
              item.processing_status === "PROCESSED"
          ).length,
          failed: webhooks.filter(
            (item) =>
              item.processing_status === "FAILED"
          ).length,
        },
        notifications: {
          total: notifications.length,
          queued: notifications.filter(
            (item) => item.status === "QUEUED"
          ).length,
          sent: notifications.filter(
            (item) => item.status === "SENT"
          ).length,
          failed: notifications.filter(
            (item) => item.status === "FAILED"
          ).length,
          dead: notifications.filter(
            (item) => item.status === "DEAD"
          ).length,
        },
        schedulerConfigured: Boolean(
          process.env.LUXE_JOB_RUNNER_SECRET
        ),
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
