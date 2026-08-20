import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { verifyAdminPassword } from "@/lib/server/security/admin-password";
import {
  createAdminSession,
  findAdminByEmail,
  setAdminSessionCookie,
} from "@/lib/server/security/admin-session";
import {
  privateRateKey,
  requireDatabaseRateLimit,
} from "@/lib/server/security/db-rate-limit";
import { writeSecurityAudit } from "@/lib/server/security/audit-log";
import { ApiError } from "@/lib/server/api/errors";
import { supabaseRest } from "@/lib/server/supabase/http";

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const body = await parseJsonObject(request);
    const email = requireString(body, "email", {
      min: 5,
      max: 200,
    })
      .trim()
      .toLowerCase();

    const password = requireString(body, "password", {
      min: 1,
      max: 300,
    });

    const ip =
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() || "unknown";

    await requireDatabaseRateLimit({
      key: privateRateKey("admin-login", email, ip),
      limit: 8,
      windowSeconds: 15 * 60,
    });

    const user = await findAdminByEmail(email);

    if (
      !user ||
      !user.active ||
      !verifyAdminPassword(password, user.password_hash)
    ) {
      await writeSecurityAudit({
        adminUserId: user?.id || null,
        eventType: "ADMIN_LOGIN_FAILED",
        severity: "WARN",
        resource: "/api/auth/login",
        action: "login",
        request,
      }).catch(() => undefined);

      throw new ApiError(
        "INVALID_ADMIN_CREDENTIALS",
        "Email or password is incorrect.",
        401
      );
    }

    const session = await createAdminSession({
      userId: user.id,
      userAgent: request.headers.get("user-agent") || "",
      ipHint: ip,
    });

    await supabaseRest<unknown>("admin_users", {
      method: "PATCH",
      query: `id=eq.${encodeURIComponent(user.id)}`,
      body: {
        last_login_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      prefer: "return=minimal",
    });

    await writeSecurityAudit({
      adminUserId: user.id,
      eventType: "ADMIN_LOGIN_SUCCESS",
      resource: "/api/auth/login",
      action: "login",
      request,
      metadata: { role: user.role },
    }).catch(() => undefined);

    const response = apiSuccess(
      {
        active: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      requestId
    );

    setAdminSessionCookie(
      response,
      session.token,
      session.expires
    );

    return response;
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
