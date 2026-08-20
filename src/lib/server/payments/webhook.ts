import { createHmac, timingSafeEqual } from "node:crypto";
import { getIntegrationConfig } from "@/lib/server/integrations/config";

export function verifyRazorpayWebhook(
  rawBody: string,
  signature: string
) {
  const secret = getIntegrationConfig().razorpay.webhookSecret;
  if (!secret || !signature) return false;

  const expected = createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (signature.length !== expected.length) return false;

  return timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(signature, "utf8")
  );
}
