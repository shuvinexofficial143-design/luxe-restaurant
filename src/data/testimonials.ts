export interface Testimonial {
  quote: string;
  source: string;
  detail: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "A dining room that understands silence as well as it understands sauce. LUXE is Mayfair's most quietly confident table.",
    source: "The Sunday Times",
    detail: "Restaurant Review, 2025",
  },
  {
    quote:
      "Twelve tables, one open fire, and cooking of extraordinary precision. The tasting menu reads like poetry and eats like theatre.",
    source: "Condé Nast Traveller",
    detail: "The Gold List, 2025",
  },
  {
    quote:
      "From the first pour of champagne to the final petit four, not a gesture is wasted. This is hospitality raised to an art form.",
    source: "Eleanor M.",
    detail: "Guest since 2016",
  },
  {
    quote:
      "Chef Moreau's kitchen performs a kind of alchemy — ember, season and patience transformed into plates you remember for years.",
    source: "The Good Food Guide",
    detail: "Editor's Choice, 2026",
  },
];
