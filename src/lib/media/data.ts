import type { GalleryItem, TourScene, VideoItem } from "./types";

export const galleryItems: GalleryItem[] = [
  {
    id: "g01",
    title: "Ember Duck",
    caption: "Coal-roasted duck moments before service.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1600&q=90",
    featured: true,
  },
  {
    id: "g02",
    title: "Main Dining",
    caption: "Warm evening service in the central dining room.",
    category: "Dining Room",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1600&q=90",
    portrait: true,
    featured: true,
  },
  {
    id: "g03",
    title: "Chef at Pass",
    caption: "Final details at the kitchen pass.",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "g04",
    title: "Cellar Selection",
    caption: "A small view into the LUXE cellar.",
    category: "Wine",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=90",
    portrait: true,
  },
  {
    id: "g05",
    title: "Seasonal Table",
    caption: "Produce-led plates built for the current season.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "g06",
    title: "Fire & Ferment",
    caption: "A one-night chef collaboration.",
    category: "Events",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1600&q=90",
    featured: true,
  },
  {
    id: "g07",
    title: "Quiet Window",
    caption: "A favourite corner before dinner begins.",
    category: "Dining Room",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "g08",
    title: "Tasting Detail",
    caption: "Small-format courses from the tasting menu.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1600&q=90",
    portrait: true,
  },
  {
    id: "g09",
    title: "Wine Dinner",
    caption: "Cellar bottles lined up for a guided pairing.",
    category: "Wine",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "g10",
    title: "Private Celebration",
    caption: "A table dressed for a milestone evening.",
    category: "Events",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=90",
    portrait: true,
  },
  {
    id: "g11",
    title: "Open Kitchen",
    caption: "The energy behind the dining room.",
    category: "Kitchen",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "g12",
    title: "Sunday Brunch",
    caption: "Long tables, shared plates and daylight.",
    category: "People",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "g13",
    title: "Dessert Finish",
    caption: "Chocolate, texture and a final pinch of salt.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "g14",
    title: "Garden Room",
    caption: "Private dining with a softer daytime mood.",
    category: "Dining Room",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=90",
  },
  {
    id: "g15",
    title: "Service Briefing",
    caption: "The team gathers before doors open.",
    category: "People",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=90",
    portrait: true,
  },
  {
    id: "g16",
    title: "The Pour",
    caption: "A cellar pairing served tableside.",
    category: "Wine",
    image: "https://images.unsplash.com/photo-1474722883778-792e7990302f?auto=format&fit=crop&w=1600&q=90",
  },
];

export const videoItems: VideoItem[] = [
  {
    id: "v01",
    title: "A Night at LUXE",
    caption: "Dining room, kitchen and final pours.",
    poster: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90",
    src: "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    duration: "00:18",
    category: "Dining Room",
  },
  {
    id: "v02",
    title: "Behind the Pass",
    caption: "A glimpse of kitchen movement before service.",
    poster: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=90",
    src: "https://videos.pexels.com/video-files/4253312/4253312-hd_1920_1080_25fps.mp4",
    duration: "00:15",
    category: "Kitchen",
  },
  {
    id: "v03",
    title: "Cellar Mood",
    caption: "Glass, bottle and candlelight.",
    poster: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=90",
    src: "https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_25fps.mp4",
    duration: "00:21",
    category: "Wine",
  },
];

export const tourScenes: TourScene[] = [
  {
    slug: "entrance",
    name: "Arrival",
    eyebrow: "01 · Welcome",
    description: "Begin at the entrance and move into the main dining room.",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2400&q=95",
    preview: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=85",
    nextSlug: "main-dining",
    hotspots: [
      { id: "h1", x: 24, y: 46, label: "Host desk", text: "Arrival and reservation check-in point." },
      { id: "h2", x: 73, y: 40, label: "Dining room", text: "Continue toward the main dining space." },
    ],
  },
  {
    slug: "main-dining",
    name: "Main Dining",
    eyebrow: "02 · Dining room",
    description: "Explore the central room, window seating and the path toward the cellar.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=2400&q=95",
    preview: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1000&q=85",
    previousSlug: "entrance",
    nextSlug: "wine-room",
    hotspots: [
      { id: "h3", x: 31, y: 54, label: "Window tables", text: "Premium two- and four-seat tables." },
      { id: "h4", x: 66, y: 44, label: "Service floor", text: "The centre of evening dining service." },
    ],
  },
  {
    slug: "wine-room",
    name: "Wine Room",
    eyebrow: "03 · Cellar",
    description: "A private dining room wrapped by wine storage and warm light.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2400&q=95",
    preview: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=85",
    previousSlug: "main-dining",
    nextSlug: "chef-table",
    hotspots: [
      { id: "h5", x: 28, y: 42, label: "Cellar wall", text: "Sommelier selection and reserve bottles." },
      { id: "h6", x: 68, y: 58, label: "Private table", text: "Designed for intimate celebrations." },
    ],
  },
  {
    slug: "chef-table",
    name: "Chef Table",
    eyebrow: "04 · Kitchen side",
    description: "The closest seats to the kitchen, designed around tasting menus.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=2400&q=95",
    preview: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1000&q=85",
    previousSlug: "wine-room",
    hotspots: [
      { id: "h7", x: 35, y: 48, label: "Chef counter", text: "Direct interaction during selected tasting experiences." },
      { id: "h8", x: 72, y: 38, label: "Open kitchen", text: "A view into plating and service." },
    ],
  },
];

export function getGalleryItem(id: string) {
  return galleryItems.find((item) => item.id === id);
}

export function getTourScene(slug: string) {
  return tourScenes.find((scene) => scene.slug === slug);
}
