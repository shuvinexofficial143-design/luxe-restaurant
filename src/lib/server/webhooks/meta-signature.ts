import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";

export function verifyMetaWebhookSignature(
  rawBody: string,
  signatureHeader: string
) {
  const secret = process.env.WHATSAPP_APP_SECRET || "";

  if (!secret || !signatureHeader) return false;

  const expected = `sha256=${createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex")}`;

  if (expected.length !== signatureHeader.length) {
    return false;
  }

  return timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(signatureHeader, "utf8")
  );
}
