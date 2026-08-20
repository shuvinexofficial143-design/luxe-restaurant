import type { PrivateDiningInquiry } from "./types";

const KEY = "luxe-private-dining-inquiries-v1";

function read(): PrivateDiningInquiry[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(next: PrivateDiningInquiry[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
}

export const privateDiningStorage = {
  list() {
    return read();
  },
  get(id: string) {
    return read().find((item) => item.id === id);
  },
  save(inquiry: PrivateDiningInquiry) {
    const current = read();
    write([inquiry, ...current.filter((item) => item.id !== inquiry.id)]);
    return inquiry;
  },
};
