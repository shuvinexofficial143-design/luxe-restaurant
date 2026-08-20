import type { GiftDraft, GiftPurchase } from "./types";

const DRAFT_KEY = "luxe-gift-draft-v1";
const PURCHASE_KEY = "luxe-gift-purchases-v1";

export const defaultGiftDraft: GiftDraft = {
  amount: 5000,
  designId: "midnight",
  occasion: "Any Occasion",
  recipientName: "",
  recipientEmail: "",
  senderName: "",
  senderEmail: "",
  message: "",
  deliveryMethod: "EMAIL",
  deliveryDate: "",
};

export const giftStorage = {
  saveDraft(draft: GiftDraft) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    }
  },

  getDraft(): GiftDraft {
    if (typeof window === "undefined") return defaultGiftDraft;

    try {
      const parsed = JSON.parse(window.localStorage.getItem(DRAFT_KEY) || "null");
      return parsed && typeof parsed === "object"
        ? { ...defaultGiftDraft, ...parsed }
        : defaultGiftDraft;
    } catch {
      return defaultGiftDraft;
    }
  },

  clearDraft() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(DRAFT_KEY);
    }
  },

  listPurchases(): GiftPurchase[] {
    if (typeof window === "undefined") return [];

    try {
      const parsed = JSON.parse(window.localStorage.getItem(PURCHASE_KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  savePurchase(purchase: GiftPurchase) {
    if (typeof window === "undefined") return purchase;
    const current = this.listPurchases();
    window.localStorage.setItem(
      PURCHASE_KEY,
      JSON.stringify([purchase, ...current.filter((item) => item.id !== purchase.id)])
    );
    return purchase;
  },

  getPurchase(id: string) {
    return this.listPurchases().find((item) => item.id === id);
  },

  findByCode(code: string) {
    return this.listPurchases().find(
      (item) => item.code.toUpperCase() === code.trim().toUpperCase()
    );
  },
};
