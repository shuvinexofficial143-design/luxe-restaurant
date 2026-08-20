import { supabaseRest } from "@/lib/server/supabase/http";
import type { CRMCustomerEvent } from "./types";

type ReservationTimelineRow = {
  id: string;
  reservation_date: string;
  reservation_time: string;
  status: string;
  created_at: string;
};

type OrderTimelineRow = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

export async function buildCustomerTimeline(input: {
  customerId: string;
  email: string;
}) {
  const [crmEvents, reservations, orders] = await Promise.all([
    supabaseRest<CRMCustomerEvent[]>("crm_customer_events", {
      query: `select=*&customer_id=eq.${encodeURIComponent(
        input.customerId
      )}&order=occurred_at.desc&limit=100`,
    }),
    supabaseRest<ReservationTimelineRow[]>("reservations", {
      query: `select=id,reservation_date,reservation_time,status,created_at&email=eq.${encodeURIComponent(
        input.email
      )}&order=created_at.desc&limit=50`,
    }),
    supabaseRest<OrderTimelineRow[]>("orders", {
      query: `select=id,total,status,created_at&customer_id=eq.${encodeURIComponent(
        input.customerId
      )}&order=created_at.desc&limit=50`,
    }),
  ]);

  const normalized = [
    ...crmEvents.map((item) => ({
      id: item.id,
      type: item.event_type,
      title: `${item.source} activity`,
      detail: item.reference_id || "",
      amount: item.amount,
      at: item.occurred_at,
    })),
    ...reservations.map((item) => ({
      id: `reservation-${item.id}`,
      type: "RESERVATION",
      title: `Reservation ${item.status}`,
      detail: `${item.reservation_date} · ${item.reservation_time}`,
      amount: null,
      at: item.created_at,
    })),
    ...orders.map((item) => ({
      id: `order-${item.id}`,
      type: "ORDER",
      title: `Order ${item.status}`,
      detail: item.id,
      amount: Number(item.total),
      at: item.created_at,
    })),
  ];

  return normalized.sort(
    (a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()
  );
}
