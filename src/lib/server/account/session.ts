import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { CUSTOMER_SESSION_COOKIE } from "@/lib/server/auth/customer-cookies";
import { resolveCustomerSession } from "@/lib/server/auth/customer-service";

export async function requireCustomer(request: NextRequest) {
  const token =
    request.cookies.get(CUSTOMER_SESSION_COOKIE)?.value || "";

  if (!token) {
    throw new ApiError(
      "AUTH_REQUIRED",
      "Please sign in to access this account resource.",
      401
    );
  }

  const resolved = await resolveCustomerSession(token);

  if (!resolved) {
    throw new ApiError(
      "SESSION_INVALID",
      "Your customer session is invalid or expired.",
      401
    );
  }

  return resolved.customer;
}
