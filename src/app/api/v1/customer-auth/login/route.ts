import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { loginCustomer } from "@/lib/server/auth/customer-service";
import { setCustomerSessionCookie } from "@/lib/server/auth/customer-cookies";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);

    const result = await loginCustomer({
      email: requireString(body, "email", { max: 200 }),
      password: requireString(body, "password", { max: 200 }),
      userAgent: request.headers.get("user-agent") || "",
      ipHint:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "",
    });

    const response = apiSuccess(
      { customer: result.customer },
      requestId
    );

    setCustomerSessionCookie(response, result.token, result.expires);
    return response;
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
