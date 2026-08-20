import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import {
  updateCommunicationPreferences,
} from "@/lib/server/communications/preferences";

function secret() {
  return process.env.LUXE_SESSION_SECRET || "";
}

export function createUnsubscribeToken(
  customerId: string
) {
  const key = secret();
  if (!key) return "";

  const signature = createHmac(
    "sha256",
    key
  )
    .update(customerId)
    .digest("base64url");

  return `${customerId}.${signature}`;
}

function verifyToken(token: string) {
  const index = token.lastIndexOf(".");
  if (index <= 0) return null;

  const customerId =
    token.slice(0, index);
  const provided =
    token.slice(index + 1);
  const key = secret();

  if (!key) return null;

  const expected = createHmac(
    "sha256",
    key
  )
    .update(customerId)
    .digest("base64url");

  if (
    provided.length !==
    expected.length
  ) {
    return null;
  }

  const valid = timingSafeEqual(
    Buffer.from(provided),
    Buffer.from(expected)
  );

  return valid
    ? customerId
    : null;
}

export async function GET(
  request: Request
) {
  const url =
    new URL(request.url);
  const token =
    url.searchParams.get("token") ||
    "";
  const customerId =
    verifyToken(token);

  if (!customerId) {
    return NextResponse.json(
      {
        ok: false,
        error: "invalid_unsubscribe_token",
      },
      { status: 400 }
    );
  }

  await updateCommunicationPreferences(
    customerId,
    {
      marketing_email: false,
      marketing_whatsapp: false,
    }
  );

  return NextResponse.json({
    ok: true,
    marketingUnsubscribed: true,
  });
}
