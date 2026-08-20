import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { checkMemoryRateLimit } from "@/lib/server/security/rate-limit";
import { supabaseAudit } from "@/lib/server/supabase/audit";
import { ApiError } from "@/lib/server/api/errors";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  const limit = checkMemoryRateLimit("admin-audit", {
    limit: 30,
    windowMs: 60_000,
  });

  if (!limit.allowed) {
    return apiFailure(
      new ApiError(
        "RATE_LIMITED",
        "Too many audit requests. Try again shortly.",
        429
      ),
      requestId
    );
  }

  try {
    const rows = await supabaseAudit.list({
      limit: 100,
      order: "created_at.desc",
    });

    return apiSuccess(
      {
        audit: rows,
        rateLimit: {
          remaining: limit.remaining,
          resetAt: limit.resetAt,
        },
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
