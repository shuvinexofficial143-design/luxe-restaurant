import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireAdminPermission } from "@/lib/server/security/admin-guard";
import { supabaseOrdersReal } from "@/lib/server/supabase/orders-real";
import { supabaseOrderItems } from "@/lib/server/supabase/order-items";

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    await requireAdminPermission(request, "orders.manage");

    const orders = await supabaseOrdersReal.listKitchen(100);
    const queue = await Promise.all(
      orders.map(async (order) => ({
        order,
        items: await supabaseOrderItems.listForOrder(order.id),
      }))
    );

    return apiSuccess({ queue }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
