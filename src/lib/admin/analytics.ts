import type { AdminAnalytics, AdminRecord } from "./types";

function numberValue(record: AdminRecord, key: string) {
  const value = record[key];
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function stringValue(record: AdminRecord, key: string) {
  const value = record[key];
  return typeof value === "string" ? value : "";
}

function sum(records: AdminRecord[], key: string) {
  return records.reduce((total, record) => total + numberValue(record, key), 0);
}

export function calculateAdminAnalytics(input: {
  reservations: AdminRecord[];
  orders: AdminRecord[];
  events: AdminRecord[];
  privateDining: AdminRecord[];
  reviews: AdminRecord[];
  gifts: AdminRecord[];
  careers: AdminRecord[];
}): AdminAnalytics {
  const reviewRatings = input.reviews
    .map((record) => numberValue(record, "rating"))
    .filter((rating) => rating > 0);

  const averageRating = reviewRatings.length
    ? reviewRatings.reduce((sumValue, rating) => sumValue + rating, 0) /
      reviewRatings.length
    : 0;

  const pendingOrders = input.orders.filter(
    (record) =>
      !["COMPLETED", "CANCELLED"].includes(stringValue(record, "status"))
  ).length;

  const pendingCareers = input.careers.filter(
    (record) =>
      !["OFFER", "CLOSED"].includes(stringValue(record, "status"))
  ).length;

  return {
    reservations: input.reservations.length,
    confirmedReservations: input.reservations.filter(
      (record) => stringValue(record, "status") === "CONFIRMED"
    ).length,
    orders: input.orders.length,
    orderRevenue: sum(input.orders, "total"),
    eventBookings: input.events.length,
    eventRevenue: sum(input.events, "total"),
    privateDining: input.privateDining.length,
    privateDiningPipeline: sum(input.privateDining, "estimatedTotal"),
    reviews: input.reviews.length,
    averageRating,
    gifts: input.gifts.length,
    giftValue: sum(input.gifts, "total"),
    careerApplications: input.careers.length,
    unreadWork: pendingOrders + pendingCareers + input.privateDining.length,
  };
}

export function formatAdminMoney(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}
