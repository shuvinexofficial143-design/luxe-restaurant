import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { ADMIN_SESSION_COOKIE } from "@/lib/server/security/admin-token";
import { resolveAdminSession } from "@/lib/server/security/admin-session";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const token =
      request.cookies.get(ADMIN_SESSION_COOKIE)?.value || "";

    const resolved = await resolveAdminSession(token);

    return apiSuccess(
      {
        active: Boolean(resolved),
        user: resolved?.user || null,
        permissions: resolved?.permissions || [],
        expiresAt: resolved?.session.expires_at || null,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
