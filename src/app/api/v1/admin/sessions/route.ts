import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseSessions } from "@/lib/server/supabase/sessions";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const rows = await supabaseSessions.list({
      limit: 100,
      order: "created_at.desc",
    });

    const safeRows = rows.map(({ token_hash: _tokenHash, ...session }) => {
      void _tokenHash;
      return session;
    });

    return apiSuccess({ sessions: safeRows }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
