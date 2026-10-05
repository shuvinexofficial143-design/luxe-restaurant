import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { supabaseAdminUsers } from "@/lib/server/supabase/users";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(request, "users.manage");

    const rows = await supabaseAdminUsers.list({
      limit: 100,
      order: "created_at.desc",
    });

    const safeRows = rows.map(({ password_hash: _passwordHash, ...user }) => {
      void _passwordHash;
      return user;
    });

    return apiSuccess({ users: safeRows }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
