import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { getSupabaseHealth } from "@/lib/server/supabase/health";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const health = await getSupabaseHealth();
    return apiSuccess(health, requestId, health.connected ? 200 : 503);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
