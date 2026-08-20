import type { AlertPreview, NotificationItem, Offer } from "./types";

export const seedNotifications: NotificationItem[] = [
  {
    id: "note-1",
    type: "EVENT",
    title: "Cellar After Dark",
    text: "Six seats remain for the next guided wine dinner.",
    href: "/events/cellar-after-dark",
    createdAt: "2026-08-20T06:30:00.000Z",
    read: false,
  },
  {
    id: "note-2",
    type: "WINE",
    title: "Sommelier pick",
    text: "River Stone Chablis is featured in this week’s cellar selection.",
    href: "/wine/river-stone-chablis",
    createdAt: "2026-08-19T14:00:00.000Z",
    read: false,
  },
  {
    id: "note-3",
    type: "OFFER",
    title: "LUXE10 demo offer",
    text: "Use LUXE10 in the online-order demo on qualifying carts.",
    href: "/order",
    createdAt: "2026-08-18T10:00:00.000Z",
    read: true,
  },
  {
    id: "note-4",
    type: "BOOKING",
    title: "Reservation reminder ready",
    text: "The notification center can later connect to real booking reminders.",
    href: "/reservations",
    createdAt: "2026-08-17T09:00:00.000Z",
    read: true,
  },
];

export const offers: Offer[] = [
  {
    id: "offer-1",
    eyebrow: "Online order",
    title: "LUXE10",
    text: "10% off qualifying demo food orders above the minimum cart value.",
    code: "LUXE10",
    href: "/order",
    validUntil: "Demo offer",
  },
  {
    id: "offer-2",
    eyebrow: "Cellar",
    title: "Sommelier Flight",
    text: "Preview a five-wine pairing route through the wine recommendation experience.",
    href: "/wine/sommelier",
    validUntil: "Seasonal demo",
  },
  {
    id: "offer-3",
    eyebrow: "Private Dining",
    title: "Celebration Planning",
    text: "Build a room, package and guest-count estimate before sending a demo enquiry.",
    href: "/private-dining",
    validUntil: "Always available",
  },
  {
    id: "offer-4",
    eyebrow: "Gift Cards",
    title: "Gift a LUXE Night",
    text: "Create a digital demo gift card with occasion design and scheduled delivery.",
    href: "/gift-cards",
    validUntil: "Portfolio demo",
  },
];

export const eventAlerts: AlertPreview[] = [
  {
    id: "event-alert-1",
    title: "Fire & Ferment",
    text: "Chef collaboration · limited seating",
    href: "/events/fire-and-ferment",
  },
  {
    id: "event-alert-2",
    title: "Cellar After Dark",
    text: "Wine dinner · guided flight",
    href: "/events/cellar-after-dark",
  },
  {
    id: "event-alert-3",
    title: "Bread & Butter Lab",
    text: "Workshop · small-group format",
    href: "/events/bread-and-butter",
  },
];

export const wineAlerts: AlertPreview[] = [
  {
    id: "wine-alert-1",
    title: "River Stone Chablis",
    text: "High-acid mineral white · sommelier choice",
    href: "/wine/river-stone-chablis",
  },
  {
    id: "wine-alert-2",
    title: "Ember Syrah",
    text: "Full-bodied red · lamb pairing",
    href: "/wine/ember-syrah",
  },
  {
    id: "wine-alert-3",
    title: "Silver Brut",
    text: "Sparkling cellar pick · celebration route",
    href: "/wine/silver-brut",
  },
];
