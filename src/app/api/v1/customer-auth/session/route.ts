import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/server/auth/customer-cookies";
import { resolveCustomerSession } from "@/lib/server/auth/customer-service";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const token =
      request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value || "";

    const resolved = await resolveCustomerSession(token);

    return apiSuccess(
      {
        active: Boolean(resolved),
        customer: resolved?.customer || null,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
