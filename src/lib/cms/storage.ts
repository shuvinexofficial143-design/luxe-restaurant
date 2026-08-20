import { cmsSeedItems } from "./data";
import type {
  CMSApproval,
  CMSCollection,
  CMSItem,
  CMSMediaItem,
  CMSRevision,
  CMSStatus,
} from "./types";

const ITEMS_KEY = "luxe-cms-items-v1";
const REVISIONS_KEY = "luxe-cms-revisions-v1";
const MEDIA_KEY = "luxe-cms-media-v1";
const APPROVALS_KEY = "luxe-cms-approvals-v1";

const listeners = new Set<() => void>();
let version = 0;

function emit() {
  version += 1;
  listeners.forEach((listener) => listener());
}

function readArray<T>(key: string): T[] {
  if (typeof window === "undefined") return [];

  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeArray<T>(key: string, value: T[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

function ensureItems(): CMSItem[] {
  if (typeof window === "undefined") return cmsSeedItems;

  const existing = readArray<CMSItem>(ITEMS_KEY);
  if (existing.length) return existing;

  writeArray(ITEMS_KEY, cmsSeedItems);
  return cmsSeedItems;
}

function revision(item: CMSItem, action: CMSRevision["action"]) {
  const current = readArray<CMSRevision>(REVISIONS_KEY);
  const next: CMSRevision = {
    id: `REV-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 5)
      .toUpperCase()}`,
    itemId: item.id,
    collection: item.collection,
    action,
    snapshot: item,
    createdAt: new Date().toISOString(),
  };
  writeArray(REVISIONS_KEY, [next, ...current].slice(0, 100));
}

export const cmsStore = {
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

  list(collection?: CMSCollection) {
    const items = ensureItems();
    return collection
      ? items.filter((item) => item.collection === collection)
      : items;
  },

  get(id: string) {
    return ensureItems().find((item) => item.id === id);
  },

  create(
    collection: CMSCollection,
    input: Pick<CMSItem, "title" | "slug" | "excerpt" | "image" | "category"> &
      Partial<Pick<CMSItem, "price" | "featured" | "sortOrder" | "status">>
  ) {
    const now = new Date().toISOString();
    const item: CMSItem = {
      id: `CMS-${Date.now().toString(36).toUpperCase()}`,
      collection,
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      image: input.image,
      category: input.category,
      price: input.price,
      status: input.status || "DRAFT",
      featured: Boolean(input.featured),
      sortOrder: input.sortOrder || 1,
      createdAt: now,
      updatedAt: now,
    };

    const items = ensureItems();
    writeArray(ITEMS_KEY, [item, ...items]);
    revision(item, "CREATED");
    emit();
    return item;
  },

  update(id: string, patch: Partial<CMSItem>) {
    const items = ensureItems();
    let updated: CMSItem | undefined;

    const next = items.map((item) => {
      if (item.id !== id) return item;
      updated = {
        ...item,
        ...patch,
        id: item.id,
        collection: item.collection,
        updatedAt: new Date().toISOString(),
      };
      return updated;
    });

    writeArray(ITEMS_KEY, next);
    if (updated) revision(updated, "UPDATED");
    emit();
    return updated;
  },

  setStatus(id: string, status: CMSStatus) {
    const item = this.update(id, { status });
    if (item) {
      revision(
        item,
        status === "PUBLISHED"
          ? "PUBLISHED"
          : status === "ARCHIVED"
            ? "ARCHIVED"
            : "UPDATED"
      );
    }
  },

  remove(id: string) {
    const items = ensureItems();
    const item = items.find((entry) => entry.id === id);
    writeArray(
      ITEMS_KEY,
      items.filter((entry) => entry.id !== id)
    );
    if (item) revision(item, "DELETED");
    emit();
  },

  revisions() {
    return readArray<CMSRevision>(REVISIONS_KEY);
  },

  media() {
    return readArray<CMSMediaItem>(MEDIA_KEY);
  },

  addMedia(name: string, url: string, alt: string) {
    const current = readArray<CMSMediaItem>(MEDIA_KEY);
    const item: CMSMediaItem = {
      id: `MED-${Date.now().toString(36).toUpperCase()}`,
      name,
      url,
      alt,
      createdAt: new Date().toISOString(),
    };
    writeArray(MEDIA_KEY, [item, ...current]);
    emit();
    return item;
  },

  approvals() {
    return readArray<CMSApproval>(APPROVALS_KEY);
  },

  requestApproval(item: CMSItem) {
    const current = readArray<CMSApproval>(APPROVALS_KEY);
    const approval: CMSApproval = {
      id: `APR-${Date.now().toString(36).toUpperCase()}`,
      itemId: item.id,
      collection: item.collection,
      title: item.title,
      requestedAt: new Date().toISOString(),
      status: "PENDING",
    };
    writeArray(APPROVALS_KEY, [approval, ...current]);
    emit();
  },

  setApproval(id: string, status: CMSApproval["status"]) {
    const current = readArray<CMSApproval>(APPROVALS_KEY);
    writeArray(
      APPROVALS_KEY,
      current.map((item) => (item.id === id ? { ...item, status } : item))
    );
    emit();
  },
};
