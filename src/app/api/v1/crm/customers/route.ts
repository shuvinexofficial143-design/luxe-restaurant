import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { listCRMCustomers } from "@/lib/server/crm/service";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(request, "crm.view");

    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit") || "100");
    const customers = await listCRMCustomers(limit);

    return apiSuccess({ customers }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
