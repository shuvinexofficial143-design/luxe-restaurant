import { backendEnvironmentStatus } from "@/lib/server/env";
import { getDatabase } from "@/lib/server/db/client";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const database = await getDatabase().health();

    return apiSuccess(
      {
        service: "luxe-api",
        version: "v1",
        environment: backendEnvironmentStatus(),
        database,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
