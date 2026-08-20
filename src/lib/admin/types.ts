export type AdminSection =
  | "reservations"
  | "orders"
  | "events"
  | "privateDining"
  | "reviews"
  | "gifts"
  | "careers";

export type AdminRecord = Record<string, unknown> & {
  id?: string;
  createdAt?: string;
  status?: string;
};

export type AdminMetric = {
  label: string;
  value: string;
  detail: string;
  href: string;
};

export type AdminAnalytics = {
  reservations: number;
  confirmedReservations: number;
  orders: number;
  orderRevenue: number;
  eventBookings: number;
  eventRevenue: number;
  privateDining: number;
  privateDiningPipeline: number;
  reviews: number;
  averageRating: number;
  gifts: number;
  giftValue: number;
  careerApplications: number;
  unreadWork: number;
};

export type AdminNavItem = {
  label: string;
  href: string;
  icon: string;
};
