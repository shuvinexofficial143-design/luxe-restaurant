import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseCustomers } from "@/lib/server/supabase/customers";
import { supabasePasswordResets } from "@/lib/server/supabase/password-resets";
import {
  createOpaqueToken,
  hashOpaqueToken,
  resetExpiry,
} from "@/lib/server/auth/tokens";
import { sendResendEmail } from "@/lib/server/email/resend";
import { passwordResetEmail } from "@/lib/server/email/customer-auth";
import { serverIds } from "@/lib/server/db/ids";

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const email = requireString(body, "email", { max: 200 })
      .trim()
      .toLowerCase();

    const customer = await supabaseCustomers.findByEmail(email);

    if (!customer || !customer.active) {
      return apiSuccess(
        {
          accepted: true,
          message:
            "If an active account exists, a reset email will be sent.",
        },
        requestId
      );
    }

    const token = createOpaqueToken();
    const reset = await supabasePasswordResets.insert({
      id: `RST-${serverIds.user()}`,
      customer_id: customer.id,
      token_hash: hashOpaqueToken(token),
      expires_at: resetExpiry(30).toISOString(),
      used_at: null,
    });

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const resetUrl = `${appUrl.replace(
      /\/+$/,
      ""
    )}/auth/reset-password?token=${encodeURIComponent(token)}`;

    const template = passwordResetEmail({
      name: customer.name,
      resetUrl,
    });

    try {
      await sendResendEmail({
        to: customer.email,
        ...template,
      });
    } catch (error) {
      await supabasePasswordResets.remove(reset.id).catch(() => undefined);
      throw error;
    }

    return apiSuccess(
      {
        accepted: true,
        message:
          "If an active account exists, a reset email will be sent.",
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
