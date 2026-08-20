import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import {
  clearCustomerSessionCookie,
  CUSTOMER_SESSION_COOKIE,
} from "@/lib/server/auth/customer-cookies";
import { revokeCustomerSession } from "@/lib/server/auth/customer-service";

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const token =
      request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value || "";

    await revokeCustomerSession(token).catch(() => undefined);

    const response = apiSuccess({ loggedOut: true }, requestId);
    clearCustomerSessionCookie(response);
    return response;
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
