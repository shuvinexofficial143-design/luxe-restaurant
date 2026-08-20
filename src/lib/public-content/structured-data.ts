import type { PublicContentItem } from "./types";
import { publicSiteUrl } from "./seo";

export function restaurantStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "LUXE Restaurant",
    url: publicSiteUrl(),
    servesCuisine: ["Modern Indian", "Contemporary"],
    priceRange: "₹₹₹",
    acceptsReservations: true,
  };
}

export function menuItemStructuredData(item: PublicContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.title,
    description: item.excerpt,
    image: item.image_url || undefined,
    offers:
      typeof item.price === "number"
        ? {
            "@type": "Offer",
            priceCurrency: "INR",
            price: item.price,
            availability: "https://schema.org/InStock",
          }
        : undefined,
  };
}

export function articleStructuredData(item: PublicContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.title,
    description: item.excerpt,
    image: item.image_url || undefined,
    datePublished: item.published_at || item.created_at || undefined,
    dateModified: item.updated_at || item.published_at || undefined,
    publisher: {
      "@type": "Organization",
      name: "LUXE Restaurant",
    },
  };
}

export function eventStructuredData(item: PublicContentItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: item.title,
    description: item.excerpt,
    image: item.image_url || undefined,
    eventAttendanceMode:
      "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "LUXE Restaurant",
    },
  };
}
