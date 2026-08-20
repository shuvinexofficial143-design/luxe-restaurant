export type FulfillmentType = "PICKUP" | "TABLE";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type PromoResult = {
  code: string;
  valid: boolean;
  label: string;
  discount: number;
};

export type OrderStatus =
  | "RECEIVED"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type OrderRecord = {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  serviceCharge: number;
  total: number;
  promoCode: string;
  fulfillment: FulfillmentType;
  pickupTime: string;
  tableNumber: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  paymentMethod: "PAY_AT_RESTAURANT" | "DEMO_CARD";
  status: OrderStatus;
  createdAt: string;
};
