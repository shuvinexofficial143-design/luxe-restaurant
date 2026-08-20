import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { getAccountDashboard } from "@/lib/server/account/service";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const dashboard = await getAccountDashboard(customer.id);

    return apiSuccess(
      {
        customer,
        ...dashboard,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
