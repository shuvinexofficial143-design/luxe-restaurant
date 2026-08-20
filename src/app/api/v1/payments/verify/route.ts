import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { verifyRazorpayPayment } from "@/lib/server/payments/razorpay";
import { markReservationDepositPaid } from "@/lib/server/reservations/deposits";
import { ApiError } from "@/lib/server/api/errors";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);

    const razorpayOrderId = requireString(body, "razorpayOrderId", {
      max: 120,
    });
    const razorpayPaymentId = requireString(body, "razorpayPaymentId", {
      max: 120,
    });
    const razorpaySignature = requireString(body, "razorpaySignature", {
      max: 256,
    });

    const verified = verifyRazorpayPayment({
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!verified) {
      throw new ApiError(
        "PAYMENT_SIGNATURE_INVALID",
        "Payment signature verification failed.",
        400
      );
    }

    const reservationId =
      typeof body.reservationId === "string"
        ? body.reservationId.trim()
        : "";

    if (reservationId) {
      await markReservationDepositPaid({
        reservationId,
        razorpayOrderId,
        razorpayPaymentId,
      });
    }

    return apiSuccess(
      {
        verified: true,
        reservationUpdated: Boolean(reservationId),
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
