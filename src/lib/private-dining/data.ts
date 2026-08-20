import type {
  PrivateDiningPackage,
  PrivateDiningRoom,
} from "./types";

export const privateDiningRooms: PrivateDiningRoom[] = [
  {
    slug: "wine-room",
    name: "The Wine Room",
    subtitle: "A candlelit room wrapped by the cellar.",
    image: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=90",
    ],
    minGuests: 6,
    maxGuests: 14,
    seated: 14,
    standing: 18,
    description:
      "Designed for intimate dinners, wine-led celebrations and executive evenings.",
    features: [
      "Dedicated host",
      "Private sommelier option",
      "Cellar backdrop",
      "Custom printed menu",
    ],
    baseMinimum: 45000,
    featured: true,
  },
  {
    slug: "garden-room",
    name: "The Garden Room",
    subtitle: "Green, bright and flexible for larger gatherings.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=90",
    ],
    minGuests: 12,
    maxGuests: 36,
    seated: 36,
    standing: 50,
    description:
      "A flexible room for birthdays, launches, family celebrations and private brunch.",
    features: [
      "Flexible table layouts",
      "Presentation screen",
      "Private bar setup",
      "Daytime availability",
    ],
    baseMinimum: 85000,
    featured: true,
  },
  {
    slug: "chef-salon",
    name: "Chef Salon",
    subtitle: "Kitchen-side dining with direct chef interaction.",
    image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=90",
    ],
    minGuests: 4,
    maxGuests: 10,
    seated: 10,
    standing: 10,
    description:
      "The most intimate private experience, built around tasting menus and chef interaction.",
    features: [
      "Kitchen-side seats",
      "Chef introduction",
      "Tasting menu only",
      "Sommelier pairing option",
    ],
    baseMinimum: 38000,
  },
  {
    slug: "ember-hall",
    name: "Ember Hall",
    subtitle: "The largest private space for full celebrations.",
    image: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1800&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=90",
    ],
    minGuests: 30,
    maxGuests: 90,
    seated: 70,
    standing: 90,
    description:
      "A full-scale event room for receptions, milestone birthdays and brand dinners.",
    features: [
      "Private entrance",
      "Dedicated bar",
      "AV-ready setup",
      "Custom floor plan",
    ],
    baseMinimum: 180000,
  },
];

export const privateDiningPackages: PrivateDiningPackage[] = [
  {
    id: "essential",
    name: "Essential",
    description: "A refined set menu for elegant private dining.",
    pricePerGuest: 4200,
    inclusions: [
      "4-course set menu",
      "Welcome non-alcoholic drink",
      "Dedicated service team",
      "Printed menu cards",
    ],
  },
  {
    id: "signature",
    name: "Signature",
    description: "The full LUXE private dining experience.",
    pricePerGuest: 6200,
    inclusions: [
      "6-course tasting menu",
      "Welcome canapé",
      "Dedicated host",
      "Custom celebration dessert",
    ],
  },
  {
    id: "cellar",
    name: "Cellar",
    description: "Food and wine pairing-led private experience.",
    pricePerGuest: 8900,
    inclusions: [
      "6-course tasting menu",
      "5-wine pairing",
      "Sommelier introduction",
      "Custom printed tasting notes",
    ],
  },
];

export function getPrivateDiningRoom(slug: string) {
  return privateDiningRooms.find((room) => room.slug === slug);
}
