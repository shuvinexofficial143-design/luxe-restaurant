import type { GiftDesign } from "./types";

export const giftDesigns: GiftDesign[] = [
  {
    id: "midnight",
    name: "Midnight LUXE",
    occasion: "Any Occasion",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1600&q=90",
    accent: "#efc28b",
    textTone: "light",
  },
  {
    id: "celebration",
    name: "Celebration Table",
    occasion: "Birthday",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=90",
    accent: "#ffd19a",
    textTone: "light",
  },
  {
    id: "anniversary",
    name: "Candlelight",
    occasion: "Anniversary",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90",
    accent: "#f3d5b2",
    textTone: "light",
  },
  {
    id: "garden",
    name: "Garden Lunch",
    occasion: "Thank You",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1600&q=90",
    accent: "#d7ecd9",
    textTone: "light",
  },
  {
    id: "wine",
    name: "Cellar Gift",
    occasion: "Congratulations",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1600&q=90",
    accent: "#e8c69b",
    textTone: "light",
  },
  {
    id: "festive",
    name: "Festive Gold",
    occasion: "Festive",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=90",
    accent: "#ffe2a8",
    textTone: "light",
  },
];

export function getGiftDesign(id: string) {
  return giftDesigns.find((design) => design.id === id) || giftDesigns[0];
}
