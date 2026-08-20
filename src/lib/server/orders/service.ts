import { ApiError } from "@/lib/server/api/errors";
import { serverIds } from "@/lib/server/db/ids";
import { supabaseRpc } from "@/lib/server/supabase/rpc";
import { supabaseOrdersReal } from "@/lib/server/supabase/orders-real";
import { supabaseOrderItems } from "@/lib/server/supabase/order-items";
import { supabaseOrderHistory } from "@/lib/server/supabase/order-history";
import type {
  CreatedOrderResult,
  OrderCartInput,
  OrderDetails,
} from "./types";

export async function createDatabaseOrder(input: {
  customerId?: string;
  guestName: string;
  phone: string;
  fulfillment: "TABLE" | "PICKUP";
  tableNumber?: string;
  pickupTime?: string;
  notes?: string;
  items: OrderCartInput[];
}) {
  const orderId = serverIds.order();

  const result = await supabaseRpc<CreatedOrderResult>(
    "luxe_create_order",
    {
      p_order_id: orderId,
      p_customer_id: input.customerId || "",
      p_guest_name: input.guestName,
      p_phone: input.phone,
      p_fulfillment: input.fulfillment,
      p_table_number: input.tableNumber || "",
      p_pickup_time: input.pickupTime || "",
      p_notes: input.notes || "",
      p_items: input.items,
    }
  );

  if (!result.ok || !result.orderId) {
    throw new ApiError(
      result.code || "ORDER_CREATE_FAILED",
      "The order could not be created.",
      409
    );
  }

  return result;
}

export async function getOrderDetails(
  orderId: string
): Promise<OrderDetails> {
  const [order, items, history] = await Promise.all([
    supabaseOrdersReal.findById(orderId),
    supabaseOrderItems.listForOrder(orderId),
    supabaseOrderHistory.listForOrder(orderId),
  ]);

  if (!order) {
    throw new ApiError(
      "ORDER_NOT_FOUND",
      "Order was not found.",
      404
    );
  }

  return { order, items, history };
}

export async function updateDatabaseOrderStatus(
  orderId: string,
  status: string,
  note?: string
) {
  const result = await supabaseRpc<{
    ok: boolean;
    code?: string;
    orderId?: string;
    status?: string;
  }>("luxe_update_order_status", {
    p_order_id: orderId,
    p_status: status,
    p_note: note || "",
  });

  if (!result.ok) {
    throw new ApiError(
      result.code || "ORDER_STATUS_FAILED",
      "Order status could not be updated.",
      409
    );
  }

  return result;
}
