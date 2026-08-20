import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { createFoodOrderPayment } from "@/lib/server/orders/payment";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const orderId = requireString(body, "orderId", {
      max: 180,
    });

    const payment = await createFoodOrderPayment(orderId);
    return apiSuccess(payment, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
