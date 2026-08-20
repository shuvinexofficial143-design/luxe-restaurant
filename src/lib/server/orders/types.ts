export type OrderCartInput = {
  slug: string;
  quantity: number;
  notes?: string;
};

export type CreatedOrderResult = {
  ok: boolean;
  orderId?: string;
  subtotal?: number;
  serviceCharge?: number;
  total?: number;
  status?: string;
  paymentStatus?: string;
  code?: string;
};

export type OrderRow = {
  id: string;
  customer_id: string | null;
  guest_name: string;
  phone: string;
  fulfillment: "TABLE" | "PICKUP";
  table_number: string | null;
  pickup_time: string | null;
  subtotal: number;
  service_charge: number;
  total: number;
  status: string;
  payment_status: string;
  notes: string | null;
  razorpay_order_id: string | null;
  razorpay_payment_id: string | null;
  created_at?: string;
  updated_at?: string;
};

export type OrderItemRow = {
  id: string;
  order_id: string;
  menu_item_slug: string;
  title: string;
  quantity: number;
  unit_price: number;
  station: string;
  notes: string | null;
  item_status: string;
  created_at?: string;
};

export type OrderStatusHistoryRow = {
  id: string;
  order_id: string;
  status: string;
  note: string | null;
  created_at: string;
};

export type OrderDetails = {
  order: OrderRow;
  items: OrderItemRow[];
  history: OrderStatusHistoryRow[];
};
