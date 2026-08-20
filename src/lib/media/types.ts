export type MediaCategory =
  | "Food"
  | "Dining Room"
  | "Kitchen"
  | "People"
  | "Wine"
  | "Events";

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: MediaCategory;
  image: string;
  portrait?: boolean;
  featured?: boolean;
};

export type VideoItem = {
  id: string;
  title: string;
  caption: string;
  poster: string;
  src: string;
  duration: string;
  category: MediaCategory;
};

export type TourHotspotData = {
  id: string;
  x: number;
  y: number;
  label: string;
  text: string;
};

export type TourScene = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  image: string;
  preview: string;
  nextSlug?: string;
  previousSlug?: string;
  hotspots: TourHotspotData[];
};
