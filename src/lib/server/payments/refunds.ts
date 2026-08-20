import { ApiError } from "@/lib/server/api/errors";

export type RazorpayRefund = {
  id: string;
  payment_id: string;
  amount: number;
  currency: string;
  status: string;
};

function credentials() {
  const keyId = process.env.RAZORPAY_KEY_ID || "";
  const keySecret =
    process.env.RAZORPAY_KEY_SECRET || "";

  if (!keyId || !keySecret) {
    throw new ApiError(
      "RAZORPAY_NOT_CONFIGURED",
      "Razorpay credentials are not configured.",
      503
    );
  }

  return { keyId, keySecret };
}

export async function createRazorpayRefund(input: {
  paymentId: string;
  amountPaise: number;
  notes?: Record<string, string>;
}) {
  const { keyId, keySecret } = credentials();

  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(
      input.paymentId
    )}/refund`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${keyId}:${keySecret}`
        ).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: input.amountPaise,
        speed: "normal",
        notes: input.notes || {},
      }),
      cache: "no-store",
    }
  );

  const payload = (await response.json()) as
    | RazorpayRefund
    | {
        error?: {
          description?: string;
        };
      };

  if (!response.ok || !("id" in payload)) {
    throw new ApiError(
      "RAZORPAY_REFUND_FAILED",
      "Razorpay refund request failed.",
      response.status >= 500 ? 503 : 422,
      payload
    );
  }

  return payload;
}
