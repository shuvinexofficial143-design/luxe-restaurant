import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { getOrderDetails } from "@/lib/server/orders/service";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const requestId = getRequestId(request);

  try {
    const { id } = await context.params;
    const details = await getOrderDetails(id);

    const safeOrder = {
      ...details.order,
      guest_name: "",
      phone: "",
    };

    return apiSuccess(
      {
        order: safeOrder,
        items: details.items,
        history: details.history,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
