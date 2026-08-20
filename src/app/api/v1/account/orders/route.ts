import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { supabaseOrdersReal } from "@/lib/server/supabase/orders-real";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);
    const orders =
      await supabaseOrdersReal.listForCustomer(customer.id);

    return apiSuccess({ orders }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
