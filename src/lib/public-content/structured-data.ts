import type { PublicContentItem } from "./types";
import { publicSiteUrl } from "./seo";
import { restaurantLocation, weeklyHours } from "@/lib/visit/data";

const dayMap: Record<string, string> = {
  Monday: "Monday",
  Tuesday: "Tuesday",
  Wednesday: "Wednesday",
  Thursday: "Thursday",
  Friday: "Friday",
  Saturday: "Saturday",
  Sunday: "Sunday",
};

export function restaurantStructuredData() {
  const base = publicSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurantLocation.name,
    url: base,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=90",
    description:
      "Contemporary fine dining in Vijay Nagar, Indore, shaped by open fire, seasonal produce and warm hospitality.",
    servesCuisine: ["Modern Indian", "Contemporary"],
    priceRange: "₹₹₹",
    telephone: restaurantLocation.phoneDisplay,
    email: restaurantLocation.email,
    acceptsReservations: true,
    hasMenu: `${base}/menu`,
    address: {
      "@type": "PostalAddress",
      streetAddress: restaurantLocation.addressLine1,
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      postalCode: "452010",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: restaurantLocation.latitude,
      longitude: restaurantLocation.longitude,
    },
    openingHoursSpecification: weeklyHours
      .filter((item) => !item.closed)
      .map((item) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[item.day] || item.day,
        opens: item.open,
        closes: item.close,
      })),
    potentialAction: {
      "@type": "ReserveAction",
      target: `${base}/reservations`,
    },
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
      address: {
        "@type": "PostalAddress",
        streetAddress: restaurantLocation.addressLine1,
        addressLocality: "Indore",
        addressRegion: "Madhya Pradesh",
        postalCode: "452010",
        addressCountry: "IN",
      },
    },
  };
}
