import { ApiError } from "@/lib/server/api/errors";
import { secureIdentifier } from "@/lib/server/security/admin-token";
import { supabasePaymentIntents } from "@/lib/server/supabase/payment-intents";
import { supabaseRefundRequests } from "@/lib/server/supabase/refund-requests";
import { createRazorpayRefund } from "@/lib/server/payments/refunds";

export async function createRefundRequest(input: {
  paymentIntentId: string;
  amount: number;
  reason: string;
  requestedBy?: string;
}) {
  const intent =
    await supabasePaymentIntents.findById(
      input.paymentIntentId
    );

  if (!intent || intent.status !== "PAID") {
    throw new ApiError(
      "PAYMENT_NOT_REFUNDABLE",
      "Only a paid payment intent can be refunded.",
      409
    );
  }

  if (
    !intent.razorpay_payment_id ||
    input.amount <= 0 ||
    input.amount > Number(intent.amount)
  ) {
    throw new ApiError(
      "INVALID_REFUND_AMOUNT",
      "Refund amount is outside the refundable range.",
      422
    );
  }

  return supabaseRefundRequests.insert({
    id: secureIdentifier("REF"),
    payment_intent_id: intent.id,
    requested_amount: input.amount,
    reason: input.reason,
    status: "REQUESTED",
    razorpay_refund_id: null,
    provider_status: null,
    requested_by: input.requestedBy || null,
    processed_by: null,
    last_error: null,
    processed_at: null,
  });
}

export async function processRefund(input: {
  refundRequestId: string;
  processedBy: string;
}) {
  const request =
    await supabaseRefundRequests.findById(
      input.refundRequestId
    );

  if (!request) {
    throw new ApiError(
      "REFUND_REQUEST_NOT_FOUND",
      "Refund request was not found.",
      404
    );
  }

  if (request.status === "REFUNDED") {
    return request;
  }

  const intent =
    await supabasePaymentIntents.findById(
      request.payment_intent_id
    );

  if (!intent?.razorpay_payment_id) {
    throw new ApiError(
      "PAYMENT_ID_MISSING",
      "The original Razorpay payment ID is missing.",
      409
    );
  }

  await supabaseRefundRequests.patch(request.id, {
    status: "PROCESSING",
    processed_by: input.processedBy,
    last_error: null,
  });

  try {
    const refund = await createRazorpayRefund({
      paymentId: intent.razorpay_payment_id,
      amountPaise: Math.round(
        Number(request.requested_amount) * 100
      ),
      notes: {
        refundRequestId: request.id,
        paymentIntentId: intent.id,
      },
    });

    const fullRefund =
      Number(request.requested_amount) >=
      Number(intent.amount);

    await supabasePaymentIntents.patch(intent.id, {
      status: fullRefund
        ? "REFUNDED"
        : "PARTIALLY_REFUNDED",
      updated_at: new Date().toISOString(),
    });

    return supabaseRefundRequests.patch(
      request.id,
      {
        status: "REFUNDED",
        razorpay_refund_id: refund.id,
        provider_status: refund.status,
        processed_by: input.processedBy,
        processed_at: new Date().toISOString(),
        last_error: null,
      }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Refund provider request failed.";

    await supabaseRefundRequests.patch(request.id, {
      status: "FAILED",
      processed_by: input.processedBy,
      last_error: message.slice(0, 2000),
      processed_at: new Date().toISOString(),
    }).catch(() => undefined);

    throw error;
  }
}
