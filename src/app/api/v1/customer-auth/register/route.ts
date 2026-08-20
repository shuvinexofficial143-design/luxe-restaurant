import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { registerCustomer } from "@/lib/server/auth/customer-service";
import { setCustomerSessionCookie } from "@/lib/server/auth/customer-cookies";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);

    const result = await registerCustomer({
      name: requireString(body, "name", { min: 2, max: 100 }),
      email: requireString(body, "email", { min: 5, max: 200 }),
      phone:
        typeof body.phone === "string" ? body.phone.trim().slice(0, 40) : "",
      password: requireString(body, "password", { min: 12, max: 200 }),
      userAgent: request.headers.get("user-agent") || "",
      ipHint:
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "",
    });

    const response = apiSuccess(
      { customer: result.customer },
      requestId,
      201
    );

    setCustomerSessionCookie(response, result.token, result.expires);
    return response;
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
