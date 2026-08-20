import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { verifyRazorpayWebhook } from "@/lib/server/payments/webhook";
import {
  ingestVerifiedWebhook,
} from "@/lib/server/webhooks/ingest";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature =
    request.headers.get("x-razorpay-signature") || "";

  if (!verifyRazorpayWebhook(rawBody, signature)) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_webhook_signature",
      },
      { status: 401 }
    );
  }

  let payload: Record<string, unknown>;

  try {
    payload = JSON.parse(rawBody) as Record<
      string,
      unknown
    >;
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 }
    );
  }

  const headerEventId =
    request.headers.get("x-razorpay-event-id") || "";

  const externalEventId =
    headerEventId ||
    `sha256:${createHash("sha256")
      .update(rawBody)
      .digest("hex")}`;

  const eventType =
    typeof payload.event === "string"
      ? payload.event
      : "unknown";

  try {
    const result = await ingestVerifiedWebhook({
      provider: "RAZORPAY",
      externalEventId,
      eventType,
      payload,
    });

    return NextResponse.json({
      ok: true,
      accepted: true,
      duplicate: result.duplicate,
      eventId: result.eventId,
      queued: Boolean(result.jobId),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "webhook_ingest_failed",
      },
      { status: 503 }
    );
  }
}
