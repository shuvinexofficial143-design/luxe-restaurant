import { supabaseRest } from "@/lib/server/supabase/http";
import type {
  AnalyticsKPI,
  AnalyticsOverview,
  AnalyticsRange,
  DailyMetric,
  HourBucket,
  TopItem,
} from "./types";
import { previousRange } from "./date-range";

type ReservationRow = {
  id: string;
  reservation_date: string;
  reservation_time: string;
  status: string;
  created_at: string;
};

type OrderRow = {
  id: string;
  fulfillment: string;
  status: string;
  total: number;
  created_at: string;
};

type CustomerRow = {
  id: string;
  created_at: string;
};

type OrderItemRow = {
  title: string;
  quantity: number;
  unit_price: number;
  created_at?: string;
};

function percentChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : null;
  return ((current - previous) / previous) * 100;
}

function dateKeys(range: AnalyticsRange) {
  const dates: string[] = [];
  const current = new Date(`${range.from}T00:00:00Z`);
  const end = new Date(`${range.to}T00:00:00Z`);

  while (current <= end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
}

async function rawForRange(range: AnalyticsRange) {
  const start = `${range.from}T00:00:00Z`;
  const end = `${range.to}T23:59:59Z`;

  const [reservations, orders, customers, items] = await Promise.all([
    supabaseRest<ReservationRow[]>("reservations", {
      query:
        `select=id,reservation_date,reservation_time,status,created_at` +
        `&created_at=gte.${encodeURIComponent(start)}` +
        `&created_at=lte.${encodeURIComponent(end)}` +
        `&limit=5000`,
    }),
    supabaseRest<OrderRow[]>("orders", {
      query:
        `select=id,fulfillment,status,total,created_at` +
        `&created_at=gte.${encodeURIComponent(start)}` +
        `&created_at=lte.${encodeURIComponent(end)}` +
        `&limit=5000`,
    }),
    supabaseRest<CustomerRow[]>("customers", {
      query:
        `select=id,created_at` +
        `&created_at=gte.${encodeURIComponent(start)}` +
        `&created_at=lte.${encodeURIComponent(end)}` +
        `&limit=5000`,
    }),
    supabaseRest<OrderItemRow[]>("order_items", {
      query:
        `select=title,quantity,unit_price,created_at` +
        `&created_at=gte.${encodeURIComponent(start)}` +
        `&created_at=lte.${encodeURIComponent(end)}` +
        `&limit=10000`,
    }),
  ]);

  return { reservations, orders, customers, items };
}

function dailySeries(
  range: AnalyticsRange,
  raw: Awaited<ReturnType<typeof rawForRange>>
): DailyMetric[] {
  return dateKeys(range).map((date) => {
    const reservations = raw.reservations.filter(
      (item) => item.created_at.slice(0, 10) === date
    );
    const orders = raw.orders.filter(
      (item) => item.created_at.slice(0, 10) === date
    );
    const customers = raw.customers.filter(
      (item) => item.created_at.slice(0, 10) === date
    );
    const completed = orders.filter(
      (item) => item.status === "COMPLETED"
    );
    const revenue = completed.reduce(
      (sum, item) => sum + Number(item.total || 0),
      0
    );

    return {
      date,
      reservations: reservations.length,
      confirmedReservations: reservations.filter(
        (item) => item.status === "CONFIRMED"
      ).length,
      orders: orders.length,
      completedOrders: completed.length,
      revenue,
      avgOrderValue: completed.length
        ? revenue / completed.length
        : 0,
      newCustomers: customers.length,
    };
  });
}

function peakHours(
  raw: Awaited<ReturnType<typeof rawForRange>>
): HourBucket[] {
  const hours = Array.from({ length: 8 }, (_, index) => 17 + index);

  return hours.map((hour) => {
    const label = `${String(hour).padStart(2, "0")}:00`;
    const reservations = raw.reservations.filter((item) =>
      item.reservation_time.startsWith(
        String(hour).padStart(2, "0")
      )
    ).length;
    const orders = raw.orders.filter(
      (item) =>
        new Date(item.created_at).getHours() === hour
    ).length;

    return {
      hour: label,
      reservations,
      orders,
      score: reservations * 2 + orders,
    };
  });
}

function topItems(
  raw: Awaited<ReturnType<typeof rawForRange>>
): TopItem[] {
  const map = new Map<string, TopItem>();

  for (const item of raw.items) {
    const current = map.get(item.title) || {
      title: item.title,
      quantity: 0,
      revenue: 0,
    };

    current.quantity += Number(item.quantity || 0);
    current.revenue +=
      Number(item.quantity || 0) * Number(item.unit_price || 0);
    map.set(item.title, current);
  }

  return [...map.values()]
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);
}

function totals(raw: Awaited<ReturnType<typeof rawForRange>>) {
  const completedOrders = raw.orders.filter(
    (item) => item.status === "COMPLETED"
  );
  const revenue = completedOrders.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  return {
    reservations: raw.reservations.length,
    confirmedReservations: raw.reservations.filter(
      (item) => item.status === "CONFIRMED"
    ).length,
    orders: raw.orders.length,
    completedOrders: completedOrders.length,
    revenue,
    avgOrderValue: completedOrders.length
      ? revenue / completedOrders.length
      : 0,
    customers: raw.customers.length,
  };
}

export async function buildAnalyticsOverview(
  range: AnalyticsRange
): Promise<AnalyticsOverview> {
  const previous = previousRange(range);
  const [raw, previousRaw] = await Promise.all([
    rawForRange(range),
    rawForRange(previous),
  ]);

  const currentTotals = totals(raw);
  const previousTotals = totals(previousRaw);

  const kpis: AnalyticsKPI[] = [
    {
      label: "Order revenue",
      value: currentTotals.revenue,
      previousValue: previousTotals.revenue,
      changePercent: percentChange(
        currentTotals.revenue,
        previousTotals.revenue
      ),
      format: "CURRENCY",
    },
    {
      label: "Completed orders",
      value: currentTotals.completedOrders,
      previousValue: previousTotals.completedOrders,
      changePercent: percentChange(
        currentTotals.completedOrders,
        previousTotals.completedOrders
      ),
      format: "NUMBER",
    },
    {
      label: "Reservations",
      value: currentTotals.reservations,
      previousValue: previousTotals.reservations,
      changePercent: percentChange(
        currentTotals.reservations,
        previousTotals.reservations
      ),
      format: "NUMBER",
    },
    {
      label: "Avg order value",
      value: currentTotals.avgOrderValue,
      previousValue: previousTotals.avgOrderValue,
      changePercent: percentChange(
        currentTotals.avgOrderValue,
        previousTotals.avgOrderValue
      ),
      format: "CURRENCY",
    },
    {
      label: "New customers",
      value: currentTotals.customers,
      previousValue: previousTotals.customers,
      changePercent: percentChange(
        currentTotals.customers,
        previousTotals.customers
      ),
      format: "NUMBER",
    },
    {
      label: "Reservation confirm rate",
      value: currentTotals.reservations
        ? (currentTotals.confirmedReservations /
            currentTotals.reservations) *
          100
        : 0,
      previousValue: previousTotals.reservations
        ? (previousTotals.confirmedReservations /
            previousTotals.reservations) *
          100
        : 0,
      changePercent: null,
      format: "PERCENT",
    },
  ];

  return {
    range,
    kpis,
    daily: dailySeries(range, raw),
    peakHours: peakHours(raw),
    topItems: topItems(raw),
    channels: {
      tableOrders: raw.orders.filter(
        (item) => item.fulfillment === "TABLE"
      ).length,
      pickupOrders: raw.orders.filter(
        (item) => item.fulfillment === "PICKUP"
      ).length,
    },
  };
}
