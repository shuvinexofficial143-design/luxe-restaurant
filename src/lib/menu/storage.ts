const KEY = "luxe-favourite-dishes-v1";
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read() {
  if (typeof window === "undefined") return [];
  if (cache) return cache;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    cache = Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
  } catch {
    cache = [];
  }

  return cache;
}

function write(next: string[]) {
  cache = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }
  listeners.forEach((listener) => listener());
}

export const favouriteStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return read();
  },
  getServerSnapshot() {
    return [] as string[];
  },
  toggle(slug: string) {
    const current = read();
    write(current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]);
  },
  clear() {
    write([]);
  },
};
