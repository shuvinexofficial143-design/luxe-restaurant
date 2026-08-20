import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { getIntegrationHealth } from "@/lib/server/integrations/health";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    return apiSuccess(await getIntegrationHealth(), requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
