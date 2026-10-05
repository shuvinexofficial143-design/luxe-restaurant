export const site = {
  name: "LUXE",
  legalName: "LUXE Restaurant",
  tagline: "Modern fire dining in Indore",
  description:
    "LUXE is a contemporary fine-dining restaurant in Vijay Nagar, Indore, shaped by open fire, seasonal produce and warm hospitality.",
  address: {
    line1: "Vijay Nagar",
    line2: "Indore, Madhya Pradesh 452010",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Vijay+Nagar+Indore+Madhya+Pradesh",
  },
  phone: "+91 731 555 0147",
  phoneHref: "tel:+917315550147",
  email: "hello@luxe-restaurant.example.com",
  emailHref: "mailto:hello@luxe-restaurant.example.com",
  eventsEmail: "events@luxe-restaurant.example.com",
  eventsEmailHref: "mailto:events@luxe-restaurant.example.com",
  hours: [
    { days: "Monday — Thursday", time: "Dinner · 18:00 — 23:00" },
    { days: "Friday", time: "Dinner · 18:00 — 23:30" },
    { days: "Saturday", time: "Lunch 12:00 — 15:00 · Dinner 18:00 — 23:30" },
    { days: "Sunday", time: "Lunch 11:30 — 15:00 · Dinner 18:00 — 22:30" },
  ],
  socials: [],
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
