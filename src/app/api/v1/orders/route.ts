import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseOrders } from "@/lib/server/supabase/orders";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const rows = await supabaseOrders.listOpen(100);
    return apiSuccess({ orders: rows }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
