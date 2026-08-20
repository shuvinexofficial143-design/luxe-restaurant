import type { OrderRecord, OrderStatus } from "./types";

const KEY = "luxe-orders-v1";

function read(): OrderRecord[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(next: OrderRecord[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
}

export const orderStorage = {
  list() {
    return read();
  },

  get(id: string) {
    return read().find((order) => order.id === id);
  },

  save(order: OrderRecord) {
    const current = read();
    write([order, ...current.filter((item) => item.id !== order.id)]);
    return order;
  },

  updateStatus(id: string, status: OrderStatus) {
    const current = read();
    const next = current.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    write(next);
    return next.find((order) => order.id === id);
  },
};
