import { ApiError } from "@/lib/server/api/errors";
import { createRazorpayOrder } from "@/lib/server/payments/razorpay";
import { supabaseOrdersReal } from "@/lib/server/supabase/orders-real";

export async function createFoodOrderPayment(
  orderId: string
) {
  const order = await supabaseOrdersReal.findById(orderId);

  if (!order) {
    throw new ApiError(
      "ORDER_NOT_FOUND",
      "Order was not found.",
      404
    );
  }

  if (order.payment_status === "PAID") {
    throw new ApiError(
      "ORDER_ALREADY_PAID",
      "This order is already paid.",
      409
    );
  }

  const razorpayOrder = await createRazorpayOrder({
    amountPaise: Math.round(Number(order.total) * 100),
    receipt: order.id.slice(0, 40),
    notes: {
      orderId: order.id,
      purpose: "food_order",
    },
  });

  await supabaseOrdersReal.patch(order.id, {
    razorpay_order_id: razorpayOrder.id,
    payment_status: "PENDING",
    updated_at: new Date().toISOString(),
  });

  return {
    orderId: order.id,
    total: Number(order.total),
    razorpayOrder,
  };
}

export async function markFoodOrderPaid(input: {
  orderId: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
}) {
  const order = await supabaseOrdersReal.findById(input.orderId);

  if (
    !order ||
    order.razorpay_order_id !== input.razorpayOrderId
  ) {
    throw new ApiError(
      "ORDER_PAYMENT_MISMATCH",
      "Payment order does not match this food order.",
      409
    );
  }

  await supabaseOrdersReal.patch(input.orderId, {
    payment_status: "PAID",
    razorpay_payment_id: input.razorpayPaymentId,
    updated_at: new Date().toISOString(),
  });
}
