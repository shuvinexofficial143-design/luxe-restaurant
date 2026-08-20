import { createHmac, timingSafeEqual } from "node:crypto";
import { ApiError } from "@/lib/server/api/errors";
import { getIntegrationConfig } from "@/lib/server/integrations/config";
import type {
  CreatePaymentOrderInput,
  RazorpayOrder,
  VerifyPaymentInput,
} from "./types";

function basicAuth(keyId: string, keySecret: string) {
  return Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

export async function createRazorpayOrder(
  input: CreatePaymentOrderInput
): Promise<RazorpayOrder> {
  const { keyId, keySecret } = getIntegrationConfig().razorpay;

  if (!keyId || !keySecret) {
    throw new ApiError(
      "RAZORPAY_NOT_CONFIGURED",
      "Razorpay credentials are not configured.",
      503
    );
  }

  if (
    !Number.isInteger(input.amountPaise) ||
    input.amountPaise < 100 ||
    input.amountPaise > 50_000_000
  ) {
    throw new ApiError(
      "INVALID_PAYMENT_AMOUNT",
      "Payment amount must be between ₹1 and ₹5,00,000.",
      422
    );
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth(keyId, keySecret)}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: input.amountPaise,
      currency: "INR",
      receipt: input.receipt.slice(0, 40),
      notes: input.notes || {},
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as
    | RazorpayOrder
    | { error?: { description?: string } };

  if (!response.ok || !("id" in payload)) {
    throw new ApiError(
      "RAZORPAY_ORDER_FAILED",
      "Razorpay order creation failed.",
      502,
      "error" in payload ? payload.error : undefined
    );
  }

  return payload;
}

export function verifyRazorpayPayment(input: VerifyPaymentInput) {
  const secret = getIntegrationConfig().razorpay.keySecret;

  if (!secret) {
    throw new ApiError(
      "RAZORPAY_NOT_CONFIGURED",
      "Razorpay key secret is missing.",
      503
    );
  }

  const expected = createHmac("sha256", secret)
    .update(`${input.razorpayOrderId}|${input.razorpayPaymentId}`)
    .digest("hex");

  const provided = input.razorpaySignature.trim();

  if (provided.length !== expected.length) return false;

  return timingSafeEqual(
    Buffer.from(expected, "utf8"),
    Buffer.from(provided, "utf8")
  );
}
