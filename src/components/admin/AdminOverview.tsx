"use client";

import { useSyncExternalStore } from "react";
import { adminStore } from "@/lib/admin/storage";
import { calculateAdminAnalytics, formatAdminMoney } from "@/lib/admin/analytics";
import AdminStatCard from "./AdminStatCard";
import AnalyticsCharts from "./AnalyticsCharts";

export default function AdminOverview() {
  useSyncExternalStore(
    adminStore.subscribe,
    adminStore.getVersion,
    adminStore.getServerVersion
  );

  const analytics = calculateAdminAnalytics({
    reservations: adminStore.list("reservations"),
    orders: adminStore.list("orders"),
    events: adminStore.list("events"),
    privateDining: adminStore.list("privateDining"),
    reviews: adminStore.list("reviews"),
    gifts: adminStore.list("gifts"),
    careers: adminStore.list("careers"),
  });

  const cards = [
    {
      label: "Reservations",
      value: String(analytics.reservations),
      detail: `${analytics.confirmedReservations} confirmed`,
      href: "/admin/reservations",
    },
    {
      label: "Orders",
      value: String(analytics.orders),
      detail: `${formatAdminMoney(analytics.orderRevenue)} value`,
      href: "/admin/orders",
    },
    {
      label: "Event bookings",
      value: String(analytics.eventBookings),
      detail: `${formatAdminMoney(analytics.eventRevenue)} booked`,
      href: "/admin/events",
    },
    {
      label: "Private dining",
      value: String(analytics.privateDining),
      detail: `${formatAdminMoney(analytics.privateDiningPipeline)} pipeline`,
      href: "/admin/private-dining",
    },
    {
      label: "Reviews",
      value: analytics.averageRating
        ? analytics.averageRating.toFixed(1)
        : "—",
      detail: `${analytics.reviews} reviews`,
      href: "/admin/reviews",
    },
    {
      label: "Gift cards",
      value: String(analytics.gifts),
      detail: `${formatAdminMoney(analytics.giftValue)} sales`,
      href: "/admin/gifts",
    },
    {
      label: "Career applications",
      value: String(analytics.careerApplications),
      detail: "Career applications",
      href: "/admin/careers",
    },
    {
      label: "Needs attention",
      value: String(analytics.unreadWork),
      detail: "Open orders + hiring + enquiries",
      href: "/admin/analytics",
    },
  ];

  return (
    <div className="mx-auto max-w-[1320px]">
      <div className="rounded-[28px] bg-[#201713] p-6 text-white md:p-8">
        <p className="text-[10px] uppercase tracking-[.15em] text-[#efc28b]">
          Operations snapshot
        </p>
        <h2 className="lx-serif mt-2 text-4xl md:text-6xl">
          One room. Every workflow.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50">
          Browser-local demo data from reservations, ordering, events, private
          dining, reviews, gift cards and careers.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((card) => (
          <AdminStatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="mt-5">
        <AnalyticsCharts analytics={analytics} />
      </div>
    </div>
  );
}
