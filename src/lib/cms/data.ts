import type { CMSCollection, CMSItem } from "./types";

const now = "2026-08-20T12:00:00.000Z";

export const cmsCollectionMeta: Record<
  CMSCollection,
  { label: string; description: string }
> = {
  menu: {
    label: "Menu",
    description: "Dishes, pricing, categories and featured menu items.",
  },
  wine: {
    label: "Wine",
    description: "Cellar entries, wine categories and featured bottles.",
  },
  events: {
    label: "Events",
    description: "Dining events, workshops and one-night experiences.",
  },
  journal: {
    label: "Journal",
    description: "Editorial stories, chef notes and restaurant articles.",
  },
  gallery: {
    label: "Gallery",
    description: "Photography, visual categories and featured media.",
  },
  homepage: {
    label: "Homepage",
    description: "Hero messaging and promoted homepage content blocks.",
  },
};

export const cmsSeedItems: CMSItem[] = [
  {
    id: "cms-menu-1",
    collection: "menu",
    title: "Ember Duck",
    slug: "ember-duck",
    excerpt: "Coal-roasted duck with seasonal accompaniments.",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1400&q=85",
    category: "Mains",
    price: 1850,
    status: "PUBLISHED",
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cms-menu-2",
    collection: "menu",
    title: "Garden Course",
    slug: "garden-course",
    excerpt: "A vegetable-led seasonal plate with bright acidity.",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1400&q=85",
    category: "Starters",
    price: 950,
    status: "PUBLISHED",
    featured: false,
    sortOrder: 2,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cms-wine-1",
    collection: "wine",
    title: "River Stone Chablis",
    slug: "river-stone-chablis",
    excerpt: "Mineral, citrus-led white with bright acidity.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=85",
    category: "White",
    price: 6200,
    status: "PUBLISHED",
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cms-event-1",
    collection: "events",
    title: "Cellar After Dark",
    slug: "cellar-after-dark",
    excerpt: "A guided wine dinner built around five cellar pours.",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1400&q=85",
    category: "Wine Dinner",
    price: 5900,
    status: "PUBLISHED",
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cms-journal-1",
    collection: "journal",
    title: "Why Fire Changes Flavour",
    slug: "why-fire-changes-flavour",
    excerpt: "A short chef note on smoke, heat and restraint.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1400&q=85",
    category: "Chef Notes",
    status: "PUBLISHED",
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cms-gallery-1",
    collection: "gallery",
    title: "Main Dining at Dusk",
    slug: "main-dining-at-dusk",
    excerpt: "Warm evening service before the dining room fills.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1400&q=85",
    category: "Dining Room",
    status: "PUBLISHED",
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
  {
    id: "cms-home-1",
    collection: "homepage",
    title: "Seasonal Tasting Menu",
    slug: "seasonal-tasting-menu",
    excerpt: "Seven courses shaped around fire, produce and the cellar.",
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=85",
    category: "Hero Feature",
    status: "PUBLISHED",
    featured: true,
    sortOrder: 1,
    createdAt: now,
    updatedAt: now,
  },
];

export function collectionItems(collection: CMSCollection) {
  return cmsSeedItems.filter((item) => item.collection === collection);
}
