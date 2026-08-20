import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { listCRMCustomers } from "@/lib/server/crm/service";
import { customerMatchesAudience } from "@/lib/server/crm/audience";
import type { CRMAudienceFilter } from "@/lib/server/crm/types";

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    if (request.cookies.get("luxe_admin_demo")?.value !== "1") {
      throw new ApiError(
        "ADMIN_REQUIRED",
        "Admin session is required.",
        401
      );
    }

    const raw = (await request.json()) as CRMAudienceFilter;
    const customers = await listCRMCustomers(200);
    const matches = customers.filter((item) =>
      customerMatchesAudience(item, raw || {})
    );

    return apiSuccess(
      {
        count: matches.length,
        customers: matches.map((item) => ({
          id: item.customer.id,
          name: item.customer.name,
          email: item.customer.email,
          phone: item.customer.phone,
          segment: item.profile.segment,
          vipScore: item.profile.vip_score,
          lifetimeValue: item.profile.lifetime_value,
          preferredChannel: item.profile.preferred_channel,
        })),
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
