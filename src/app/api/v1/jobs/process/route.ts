import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { requireCsrf } from "@/lib/server/security/csrf";
import { jobRunnerSecret } from "@/lib/server/jobs/config";
import { runJobBatch } from "@/lib/server/jobs/worker";

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const expected = jobRunnerSecret();
    const authorization =
      request.headers.get("authorization") || "";

    const runnerAuthorized =
      Boolean(expected) &&
      authorization === `Bearer ${expected}`;

    if (!runnerAuthorized) {
      requireCsrf(request);
      await requireAdminPermission(
        request,
        "security.view"
      );
    }

    let body: unknown = {};

    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const record =
      body &&
      typeof body === "object" &&
      !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : {};

    const limit =
      typeof record.limit === "number"
        ? record.limit
        : 10;

    const summary = await runJobBatch({
      workerId:
        typeof record.workerId === "string"
          ? record.workerId.slice(0, 120)
          : undefined,
      limit,
    });

    return apiSuccess(summary, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
