import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabasePasswordResets } from "@/lib/server/supabase/password-resets";
import { supabaseCustomers } from "@/lib/server/supabase/customers";
import { supabaseCustomerSessions } from "@/lib/server/supabase/customer-sessions";
import { hashOpaqueToken } from "@/lib/server/auth/tokens";
import { hashPassword } from "@/lib/server/auth/password-hash";
import { ApiError } from "@/lib/server/api/errors";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const token = requireString(body, "token", { min: 20, max: 300 });
    const password = requireString(body, "password", {
      min: 12,
      max: 200,
    });

    const reset = await supabasePasswordResets.findUsableByHash(
      hashOpaqueToken(token)
    );

    if (!reset) {
      throw new ApiError(
        "RESET_TOKEN_INVALID",
        "This reset link is invalid or expired.",
        400
      );
    }

    const customer = await supabaseCustomers.findById(reset.customer_id);

    if (!customer || !customer.active) {
      throw new ApiError(
        "ACCOUNT_UNAVAILABLE",
        "This account is unavailable.",
        400
      );
    }

    await supabaseCustomers.patch(customer.id, {
      password_hash: hashPassword(password),
      updated_at: new Date().toISOString(),
    });

    await supabasePasswordResets.markUsed(reset.id);
    await supabaseCustomerSessions.revokeAllForCustomer(customer.id);

    return apiSuccess(
      {
        reset: true,
        message: "Password updated. Please sign in again.",
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
