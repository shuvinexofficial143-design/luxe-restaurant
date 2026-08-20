import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { supabaseAsyncJobs } from "@/lib/server/supabase/async-jobs";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(
      request,
      "security.view"
    );

    const jobs =
      await supabaseAsyncJobs.listFailures(150);

    return apiSuccess({ jobs }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
