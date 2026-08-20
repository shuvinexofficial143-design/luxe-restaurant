import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import type { AdminPermission } from "./admin-types";
import { ADMIN_SESSION_COOKIE } from "./admin-token";
import { resolveAdminSession } from "./admin-session";
import { roleHasPermission } from "./admin-permissions";
import { writeSecurityAudit } from "./audit-log";

export async function requireAdminPermission(
  request: NextRequest,
  permission: AdminPermission
) {
  const token =
    request.cookies.get(ADMIN_SESSION_COOKIE)?.value || "";

  const resolved = await resolveAdminSession(token);

  if (!resolved) {
    throw new ApiError(
      "ADMIN_AUTH_REQUIRED",
      "A valid admin session is required.",
      401
    );
  }

  if (!roleHasPermission(resolved.user.role, permission)) {
    await writeSecurityAudit({
      adminUserId: resolved.user.id,
      eventType: "PERMISSION_DENIED",
      severity: "WARN",
      resource: request.nextUrl.pathname,
      action: permission,
      request,
    }).catch(() => undefined);

    throw new ApiError(
      "ADMIN_PERMISSION_DENIED",
      "Your admin role does not allow this action.",
      403
    );
  }

  return resolved;
}

export async function requireAdminPagePermission(
  permission: AdminPermission
) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value || "";

  const resolved = await resolveAdminSession(token).catch(
    () => null
  );

  if (!resolved) {
    redirect("/admin/login");
  }

  if (!roleHasPermission(resolved.user.role, permission)) {
    redirect("/admin/unauthorized");
  }

  return resolved;
}
