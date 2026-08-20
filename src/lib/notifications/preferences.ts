import type { SubscriptionPreferences } from "./types";

export const defaultSubscriptionPreferences: SubscriptionPreferences = {
  weeklyDigest: true,
  eventAlerts: true,
  wineAlerts: true,
  offers: true,
  privateDining: false,
  bookingReminders: true,
};

export const preferenceLabels: {
  key: keyof SubscriptionPreferences;
  title: string;
  text: string;
}[] = [
  {
    key: "weeklyDigest",
    title: "Weekly Digest",
    text: "One compact roundup of menus, events, wine and restaurant news.",
  },
  {
    key: "eventAlerts",
    title: "Event Alerts",
    text: "Chef collaborations, wine dinners, brunches and workshops.",
  },
  {
    key: "wineAlerts",
    title: "Wine Alerts",
    text: "Sommelier picks, rare bottles and pairing suggestions.",
  },
  {
    key: "offers",
    title: "Offers",
    text: "Demo promo codes, gift-card moments and seasonal offers.",
  },
  {
    key: "privateDining",
    title: "Private Dining",
    text: "Room, package and celebration-planning updates.",
  },
  {
    key: "bookingReminders",
    title: "Booking Reminders",
    text: "Reservation reminders and pre-visit planning prompts.",
  },
];
