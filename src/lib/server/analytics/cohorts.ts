import { supabaseRest } from "@/lib/server/supabase/http";
import type { CohortRow } from "./types";

type CustomerRow = {
  id: string;
  created_at: string;
};

type OrderRow = {
  customer_id: string | null;
  total: number;
  created_at: string;
  status: string;
};

function monthKey(value: string) {
  return value.slice(0, 7);
}

export async function buildCustomerCohorts(
  months = 6
): Promise<CohortRow[]> {
  const start = new Date();
  start.setUTCMonth(start.getUTCMonth() - (months - 1));
  start.setUTCDate(1);
  start.setUTCHours(0, 0, 0, 0);

  const [customers, orders] = await Promise.all([
    supabaseRest<CustomerRow[]>("customers", {
      query:
        `select=id,created_at&created_at=gte.${encodeURIComponent(
          start.toISOString()
        )}&limit=5000`,
    }),
    supabaseRest<OrderRow[]>("orders", {
      query:
        `select=customer_id,total,created_at,status` +
        `&created_at=gte.${encodeURIComponent(start.toISOString())}` +
        `&status=neq.CANCELLED&limit=10000`,
    }),
  ]);

  const now = Date.now();
  const grouped = new Map<string, CustomerRow[]>();

  for (const customer of customers) {
    const key = monthKey(customer.created_at);
    grouped.set(key, [...(grouped.get(key) || []), customer]);
  }

  return [...grouped.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([cohort, members]) => {
      const ids = new Set(members.map((item) => item.id));
      const memberOrders = orders.filter(
        (order) => order.customer_id && ids.has(order.customer_id)
      );
      const activeIds = new Set(
        memberOrders
          .filter(
            (order) =>
              now - new Date(order.created_at).getTime() <=
              30 * 86_400_000
          )
          .map((order) => order.customer_id)
          .filter(Boolean)
      );

      const orderValue = memberOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      );

      return {
        cohort,
        customers: members.length,
        active30d: activeIds.size,
        retentionPercent: members.length
          ? (activeIds.size / members.length) * 100
          : 0,
        orderValue,
      };
    });
}
