export type NotificationType = "EVENT" | "WINE" | "OFFER" | "BOOKING" | "GENERAL";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  text: string;
  href: string;
  createdAt: string;
  read: boolean;
};

export type SubscriptionPreferences = {
  weeklyDigest: boolean;
  eventAlerts: boolean;
  wineAlerts: boolean;
  offers: boolean;
  privateDining: boolean;
  bookingReminders: boolean;
};

export type SubscriptionRecord = {
  id: string;
  email: string;
  name: string;
  preferences: SubscriptionPreferences;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Offer = {
  id: string;
  title: string;
  eyebrow: string;
  text: string;
  code?: string;
  href: string;
  validUntil: string;
};

export type AlertPreview = {
  id: string;
  title: string;
  text: string;
  href: string;
};
