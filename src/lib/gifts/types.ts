export type GiftDeliveryMethod = "EMAIL" | "PRINT";
export type GiftPaymentMethod = "DEMO_CARD" | "PAY_AT_RESTAURANT";

export type GiftDesign = {
  id: string;
  name: string;
  occasion: string;
  image: string;
  accent: string;
  textTone: "light" | "dark";
};

export type GiftDraft = {
  amount: number;
  designId: string;
  occasion: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  message: string;
  deliveryMethod: GiftDeliveryMethod;
  deliveryDate: string;
};

export type GiftPurchase = GiftDraft & {
  id: string;
  code: string;
  paymentMethod: GiftPaymentMethod;
  serviceFee: number;
  total: number;
  balance: number;
  status: "ACTIVE" | "USED" | "CANCELLED";
  createdAt: string;
};
