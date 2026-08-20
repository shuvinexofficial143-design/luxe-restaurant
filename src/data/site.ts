export const site = {
  name: "LUXE",
  legalName: "LUXE Restaurant Ltd.",
  tagline: "Modern European fine dining",
  description:
    "LUXE is a Michelin-starred, twelve-table dining room in Mayfair, London. A seasonal tasting menu written each dawn, cooked over open fire, and served with quiet theatre.",
  address: {
    line1: "12 Berkeley Square",
    line2: "Mayfair, London W1J 6HE",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=12+Berkeley+Square+Mayfair+London",
  },
  phone: "+44 20 7946 0831",
  phoneHref: "tel:+442079460831",
  email: "reservations@luxelondon.co.uk",
  emailHref: "mailto:reservations@luxelondon.co.uk",
  eventsEmail: "events@luxelondon.co.uk",
  eventsEmailHref: "mailto:events@luxelondon.co.uk",
  hours: [
    { days: "Tuesday — Thursday", time: "Dinner · 17:30 — 23:00" },
    { days: "Friday — Sunday", time: "Lunch 12:00 — 14:30 · Dinner 17:30 — 23:00" },
    { days: "The Bar", time: "Tuesday — Sunday · 17:00 — late" },
    { days: "Monday", time: "Closed" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/luxe.london" },
    { label: "Facebook", href: "https://facebook.com/luxelondon" },
    { label: "X", href: "https://x.com/luxelondon" },
  ],
  nav: [
    { label: "Menu", href: "/menu" },
    { label: "Experiences", href: "/experiences" },
    { label: "Private Dining", href: "/private-dining" },
    { label: "Gallery", href: "/gallery" },
    { label: "Journal", href: "/journal" },
    { label: "About", href: "/about" },
    { label: "Our Chefs", href: "/chefs" },
    { label: "Contact", href: "/contact" },
  ],
} as const;

export const pageLabels: Record<string, string> = {
  "/": "Home",
  "/menu": "The Menu",
  "/reservations": "Reservations",
  "/about": "Our Story",
  "/chefs": "Our Chefs",
  "/private-dining": "Private Dining",
  "/gallery": "Gallery",
  "/experiences": "Experiences",
  "/journal": "Journal",
  "/contact": "Contact",
};
