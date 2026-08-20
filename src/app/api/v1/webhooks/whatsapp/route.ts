import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getIntegrationConfig } from "@/lib/server/integrations/config";
import {
  verifyMetaWebhookSignature,
} from "@/lib/server/webhooks/meta-signature";
import {
  ingestVerifiedWebhook,
} from "@/lib/server/webhooks/ingest";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get(
    "hub.verify_token"
  );
  const challenge = url.searchParams.get(
    "hub.challenge"
  );
  const expected =
    getIntegrationConfig().whatsapp.verifyToken;

  if (
    mode === "subscribe" &&
    expected &&
    token === expected &&
    challenge
  ) {
    return new NextResponse(challenge, {
      status: 200,
    });
  }

  return NextResponse.json(
    { ok: false, error: "verification_failed" },
    { status: 403 }
  );
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature =
    request.headers.get("x-hub-signature-256") || "";

  if (!process.env.WHATSAPP_APP_SECRET) {
    return NextResponse.json(
      {
        ok: false,
        error: "whatsapp_app_secret_not_configured",
      },
      { status: 503 }
    );
  }

  if (
    !verifyMetaWebhookSignature(
      rawBody,
      signature
    )
  ) {
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

  const externalEventId = `sha256:${createHash(
    "sha256"
  )
    .update(rawBody)
    .digest("hex")}`;

  try {
    const result = await ingestVerifiedWebhook({
      provider: "WHATSAPP",
      externalEventId,
      eventType: "whatsapp.webhook",
      payload,
    });

    return NextResponse.json({
      ok: true,
      accepted: true,
      duplicate: result.duplicate,
      eventId: result.eventId,
      queued: Boolean(result.jobId),
      autoReplySent: false,
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
