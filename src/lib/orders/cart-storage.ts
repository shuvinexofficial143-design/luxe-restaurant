import type { CartItem } from "./types";

const KEY = "luxe-cart-v1";
const EMPTY: CartItem[] = [];
const listeners = new Set<() => void>();
let cache: CartItem[] | null = null;

function read(): CartItem[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    cache = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cache = EMPTY;
  }

  return cache;
}

function write(next: CartItem[]) {
  cache = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((listener) => listener());
}

export const cartStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getSnapshot() {
    return read();
  },

  getServerSnapshot() {
    return EMPTY;
  },

  add(item: Omit<CartItem, "quantity">, quantity = 1) {
    const current = read();
    const existing = current.find((entry) => entry.slug === item.slug);

    if (existing) {
      write(
        current.map((entry) =>
          entry.slug === item.slug
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        )
      );
      return;
    }

    write([...current, { ...item, quantity }]);
  },

  setQuantity(slug: string, quantity: number) {
    const current = read();

    if (quantity <= 0) {
      write(current.filter((entry) => entry.slug !== slug));
      return;
    }

    write(
      current.map((entry) =>
        entry.slug === slug ? { ...entry, quantity } : entry
      )
    );
  },

  remove(slug: string) {
    write(read().filter((entry) => entry.slug !== slug));
  },

  clear() {
    write([]);
  },
};
