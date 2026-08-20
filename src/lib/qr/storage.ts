import type { QRHistoryItem, QRShareType } from "./types";

const KEY = "luxe-qr-history-v1";

export const qrHistoryStorage = {
  list(): QRHistoryItem[] {
    if (typeof window === "undefined") return [];

    try {
      const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  add(type: QRShareType, title: string, url: string) {
    if (typeof window === "undefined") return;

    const current = this.list();
    const item: QRHistoryItem = {
      id: `QR-${Date.now().toString(36).toUpperCase()}`,
      type,
      title,
      url,
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem(KEY, JSON.stringify([item, ...current].slice(0, 30)));
  },

  clear() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(KEY);
    }
  },
};
