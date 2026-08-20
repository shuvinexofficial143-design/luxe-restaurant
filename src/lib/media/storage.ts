const KEY = "luxe-gallery-favourites-v1";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache !== null) return cache;

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

export const mediaFavouriteStore = {
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
  toggle(id: string) {
    const current = read();
    write(
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  },
};
