import { storageKeys } from "./data";
import type { AdminRecord, AdminSection } from "./types";

const listeners = new Set<() => void>();
let version = 0;

function emit() {
  version += 1;
  listeners.forEach((listener) => listener());
}

function safeArray(value: string | null): AdminRecord[] {
  if (!value) return [];

  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter(
          (item): item is AdminRecord =>
            Boolean(item) && typeof item === "object" && !Array.isArray(item)
        )
      : [];
  } catch {
    return [];
  }
}

export const adminStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },

  getVersion() {
    return version;
  },

  getServerVersion() {
    return 0;
  },

  list(section: AdminSection): AdminRecord[] {
    if (typeof window === "undefined") return [];
    return safeArray(window.localStorage.getItem(storageKeys[section]));
  },

  updateStatus(section: AdminSection, id: string, status: string) {
    if (typeof window === "undefined") return;

    const records = this.list(section);
    const next = records.map((record) =>
      String(record.id || "") === id ? { ...record, status } : record
    );

    window.localStorage.setItem(storageKeys[section], JSON.stringify(next));
    emit();
  },

  remove(section: AdminSection, id: string) {
    if (typeof window === "undefined") return;

    const records = this.list(section).filter(
      (record) => String(record.id || "") !== id
    );

    window.localStorage.setItem(storageKeys[section], JSON.stringify(records));
    emit();
  },

  refresh() {
    emit();
  },
};
