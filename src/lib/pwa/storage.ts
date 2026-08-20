const KEY = "luxe-pwa-saved-v1";

export type SavedOfflineItem = {
  id: string;
  title: string;
  href: string;
  savedAt: string;
};

export const pwaStorage = {
  list(): SavedOfflineItem[] {
    if (typeof window === "undefined") return [];

    try {
      const parsed = JSON.parse(window.localStorage.getItem(KEY) || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  save(item: Omit<SavedOfflineItem, "savedAt">) {
    if (typeof window === "undefined") return;

    const current = this.list();
    const next: SavedOfflineItem = {
      ...item,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(
      KEY,
      JSON.stringify([next, ...current.filter((entry) => entry.id !== item.id)])
    );
  },

  clear() {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(KEY);
    }
  },
};
