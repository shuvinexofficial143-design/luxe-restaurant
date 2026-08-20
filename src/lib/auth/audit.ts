import type { AuditEvent } from "./types";

const KEY = "luxe-auth-audit-v1";

export const authAuditStore = {
  list(): AuditEvent[] {
    if (typeof window === "undefined") return [];

    try {
      const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  add(action: string, detail: string) {
    if (typeof window === "undefined") return;

    const event: AuditEvent = {
      id: `AUD-${Date.now().toString(36).toUpperCase()}`,
      action,
      detail,
      createdAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      KEY,
      JSON.stringify([event, ...this.list()].slice(0, 50))
    );
  },
};
