import type { CMSCollection, CMSItem } from "./types";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function collectionHref(collection: CMSCollection) {
  return `/admin/cms/${collection}`;
}

export function publicPreviewHref(item: CMSItem) {
  return `/admin/cms/preview/${encodeURIComponent(item.id)}`;
}

export function cmsMoney(value?: number) {
  if (typeof value !== "number") return "—";
  return `₹${value.toLocaleString("en-IN")}`;
}
