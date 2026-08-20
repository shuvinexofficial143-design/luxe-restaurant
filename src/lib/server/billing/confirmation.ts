import { ApiError } from "@/lib/server/api/errors";
import { verifyRazorpayPayment } from "@/lib/server/payments/razorpay";
import { markReservationDepositPaid } from "@/lib/server/reservations/deposits";
import { markFoodOrderPaid } from "@/lib/server/orders/payment";
import {
  findPaymentIntent,
  markIntentPaid,
} from "./intent-service";
import { issueReceiptForIntent } from "./receipt-service";

export async function confirmCheckout(input: {
  paymentIntentId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  const intent = await findPaymentIntent(
    input.paymentIntentId
  );

  if (!intent) {
    throw new ApiError(
      "PAYMENT_INTENT_NOT_FOUND",
      "Payment intent was not found.",
      404
    );
  }

  if (
    !intent.razorpay_order_id ||
    intent.razorpay_order_id !==
      input.razorpayOrderId
  ) {
    throw new ApiError(
      "PAYMENT_ORDER_MISMATCH",
      "Razorpay order does not match the payment intent.",
      409
    );
  }

  const verified = verifyRazorpayPayment({
    razorpayOrderId: input.razorpayOrderId,
    razorpayPaymentId: input.razorpayPaymentId,
    razorpaySignature: input.razorpaySignature,
  });

  if (!verified) {
    throw new ApiError(
      "PAYMENT_SIGNATURE_INVALID",
      "Razorpay payment signature verification failed.",
      400
    );
  }

  if (intent.status === "PAID") {
    const receipt = await issueReceiptForIntent(intent);

    return {
      alreadyConfirmed: true,
      intent,
      receipt,
    };
  }

  if (intent.entity_type === "ORDER") {
    await markFoodOrderPaid({
      orderId: intent.entity_id,
      razorpayOrderId: input.razorpayOrderId,
      razorpayPaymentId: input.razorpayPaymentId,
    });
  } else {
    await markReservationDepositPaid({
      reservationId: intent.entity_id,
      razorpayOrderId: input.razorpayOrderId,
      razorpayPaymentId: input.razorpayPaymentId,
    });
  }

  const paidIntent =
    (await markIntentPaid({
      intent,
      paymentId: input.razorpayPaymentId,
    })) || {
      ...intent,
      status: "PAID" as const,
      razorpay_payment_id:
        input.razorpayPaymentId,
    };

  const receipt =
    await issueReceiptForIntent(paidIntent);

  return {
    alreadyConfirmed: false,
    intent: paidIntent,
    receipt,
  };
}
