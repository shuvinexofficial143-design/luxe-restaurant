const KEY = "luxe-favourite-wines-v1";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read() {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;

  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
    cache = Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === "string")
      : EMPTY;
  } catch {
    cache = EMPTY;
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

export const favouriteWineStore = {
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
  toggle(slug: string) {
    const current = read();
    write(
      current.includes(slug)
        ? current.filter((item) => item !== slug)
        : [...current, slug]
    );
  },
  clear() {
    write([]);
  },
};
