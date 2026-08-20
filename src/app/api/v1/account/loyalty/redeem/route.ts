import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { parseJsonObject, requireString } from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { redeemLoyaltyReward } from "@/lib/server/account/service";

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const body = await parseJsonObject(request);
    const rewardId = requireString(body, "rewardId", { max: 120 });

    const result = await redeemLoyaltyReward(
      customer.id,
      rewardId
    );

    return apiSuccess(result, requestId, 201);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
