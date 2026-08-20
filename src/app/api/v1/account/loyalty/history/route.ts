import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { supabaseLoyaltyTransactions } from "@/lib/server/supabase/loyalty";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const history =
      await supabaseLoyaltyTransactions.listForCustomer(customer.id);

    return apiSuccess({ history }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
