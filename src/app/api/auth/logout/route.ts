import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import {
  clearAdminSessionCookie,
  revokeAdminSession,
  resolveAdminSession,
} from "@/lib/server/security/admin-session";
import { ADMIN_SESSION_COOKIE } from "@/lib/server/security/admin-token";
import { writeSecurityAudit } from "@/lib/server/security/audit-log";

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const token =
      request.cookies.get(ADMIN_SESSION_COOKIE)?.value || "";

    const resolved = token
      ? await resolveAdminSession(token).catch(() => null)
      : null;

    await revokeAdminSession(token).catch(() => undefined);

    await writeSecurityAudit({
      adminUserId: resolved?.user.id || null,
      eventType: "ADMIN_LOGOUT",
      resource: "/api/auth/logout",
      action: "logout",
      request,
    }).catch(() => undefined);

    const response = apiSuccess(
      { loggedOut: true },
      requestId
    );

    clearAdminSessionCookie(response);
    return response;
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
