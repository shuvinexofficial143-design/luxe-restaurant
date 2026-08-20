import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseAdminUsers } from "@/lib/server/supabase/users";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
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
