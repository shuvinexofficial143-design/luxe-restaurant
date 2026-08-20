import { serverIds } from "@/lib/server/db/ids";
import { supabaseRest } from "@/lib/server/supabase/http";
import { supabaseCRMProfiles } from "@/lib/server/supabase/crm-profiles";
import { supabaseCRMTags } from "@/lib/server/supabase/customer-tags";
import type {
  CRMCustomerProfile,
  CRMCustomerSummary,
} from "./types";
import { calculateVipScore } from "./scoring";
import { resolveSegment } from "./segmentation";

type CustomerRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  created_at?: string;
};

type OrderAggRow = {
  id: string;
  total: number;
  created_at: string;
};

type ReservationAggRow = {
  id: string;
  created_at: string;
};

type LoyaltyRow = {
  customer_id: string;
  lifetime_points: number;
};

export async function calculateCustomerCRMProfile(
  customer: CustomerRow
): Promise<CRMCustomerProfile> {
  const [orders, reservations, wallet] = await Promise.all([
    supabaseRest<OrderAggRow[]>("orders", {
      query: `select=id,total,created_at&customer_id=eq.${encodeURIComponent(
        customer.id
      )}&status=neq.CANCELLED&limit=500`,
    }),
    supabaseRest<ReservationAggRow[]>("reservations", {
      query: `select=id,created_at&email=eq.${encodeURIComponent(
        customer.email
      )}&status=neq.CANCELLED&limit=500`,
    }),
    supabaseRest<LoyaltyRow[]>("loyalty_wallets", {
      query: `select=customer_id,lifetime_points&customer_id=eq.${encodeURIComponent(
        customer.id
      )}&limit=1`,
    }),
  ]);

  const lifetimeValue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const activityDates = [
    ...orders.map((item) => item.created_at),
    ...reservations.map((item) => item.created_at),
  ]
    .filter(Boolean)
    .sort()
    .reverse();

  const lastActivityAt = activityDates[0] || null;

  const vipScore = calculateVipScore({
    totalOrders: orders.length,
    totalReservations: reservations.length,
    lifetimeValue,
    loyaltyPoints: Number(wallet[0]?.lifetime_points || 0),
    lastActivityAt,
  });

  const segment = resolveSegment({
    vipScore,
    totalOrders: orders.length,
    totalReservations: reservations.length,
    lastActivityAt,
  });

  const existing =
    await supabaseCRMProfiles.findByCustomerId(customer.id);

  const next = {
    id: existing?.id || `CRM-${serverIds.user()}`,
    customer_id: customer.id,
    segment,
    vip_score: vipScore,
    lifetime_value: lifetimeValue,
    total_orders: orders.length,
    total_reservations: reservations.length,
    last_activity_at: lastActivityAt,
    preferred_channel:
      existing?.preferred_channel || ("EMAIL" as const),
    do_not_contact: existing?.do_not_contact || false,
    updated_at: new Date().toISOString(),
  };

  if (existing) {
    return (
      (await supabaseCRMProfiles.patch(existing.id, next)) || next
    );
  }

  return supabaseCRMProfiles.insert(next);
}

export async function listCRMCustomers(limit = 100) {
  const customers = await supabaseRest<CustomerRow[]>("customers", {
    query: `select=id,name,email,phone,created_at&active=eq.true&order=created_at.desc&limit=${Math.min(
      200,
      Math.max(1, limit)
    )}`,
  });

  const summaries: CRMCustomerSummary[] = [];

  for (const customer of customers) {
    const profile = await calculateCustomerCRMProfile(customer);
    const tags = await supabaseCRMTags.listForCustomer(customer.id);
    summaries.push({ customer, profile, tags });
  }

  return summaries.sort(
    (a, b) => b.profile.vip_score - a.profile.vip_score
  );
}

export async function getCRMCustomer(customerId: string) {
  const customers = await supabaseRest<CustomerRow[]>("customers", {
    query: `select=id,name,email,phone,created_at&id=eq.${encodeURIComponent(
      customerId
    )}&limit=1`,
  });

  const customer = customers[0];
  if (!customer) return null;

  const [profile, tags] = await Promise.all([
    calculateCustomerCRMProfile(customer),
    supabaseCRMTags.listForCustomer(customer.id),
  ]);

  return { customer, profile, tags };
}
