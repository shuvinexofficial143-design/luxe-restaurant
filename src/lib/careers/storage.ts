import type { CareerApplication } from "./types";

const KEY = "luxe-career-applications-v1";

function read(): CareerApplication[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(next: CareerApplication[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
}

export const careerApplicationStorage = {
  list() {
    return read();
  },

  get(id: string) {
    return read().find((application) => application.id === id);
  },

  save(application: CareerApplication) {
    const current = read();
    write([
      application,
      ...current.filter((item) => item.id !== application.id),
    ]);
    return application;
  },

  findByEmail(email: string) {
    const normalized = email.trim().toLowerCase();
    return read().filter(
      (application) => application.email.toLowerCase() === normalized
    );
  },
};
