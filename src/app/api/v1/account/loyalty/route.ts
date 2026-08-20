import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { ensureLoyaltyWallet } from "@/lib/server/account/service";
import { supabaseLoyaltyTransactions } from "@/lib/server/supabase/loyalty";
import { loyaltyRewards } from "@/lib/server/account/loyalty";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);

    const [wallet, history] = await Promise.all([
      ensureLoyaltyWallet(customer.id),
      supabaseLoyaltyTransactions.listForCustomer(customer.id),
    ]);

    return apiSuccess(
      {
        wallet,
        history,
        rewards: loyaltyRewards,
      },
      requestId
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
