import type { GalleryItem, MediaCategory } from "./types";

export function filterGallery(
  items: GalleryItem[],
  query: string,
  category: "All" | MediaCategory
) {
  const q = query.trim().toLowerCase();

  return items.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (!q) return true;

    return [item.title, item.caption, item.category]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });
}
