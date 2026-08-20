export type AnalyticsRange = {
  from: string;
  to: string;
  days: number;
};

export type AnalyticsKPI = {
  label: string;
  value: number;
  previousValue: number;
  changePercent: number | null;
  format: "NUMBER" | "CURRENCY" | "PERCENT";
};

export type DailyMetric = {
  date: string;
  reservations: number;
  confirmedReservations: number;
  orders: number;
  completedOrders: number;
  revenue: number;
  avgOrderValue: number;
  newCustomers: number;
};

export type HourBucket = {
  hour: string;
  reservations: number;
  orders: number;
  score: number;
};

export type TopItem = {
  title: string;
  quantity: number;
  revenue: number;
};

export type CohortRow = {
  cohort: string;
  customers: number;
  active30d: number;
  retentionPercent: number;
  orderValue: number;
};

export type ForecastPoint = {
  date: string;
  expectedReservations: number;
  expectedOrders: number;
  expectedRevenue: number;
  confidence: "LOW" | "MEDIUM";
};

export type AnalyticsOverview = {
  range: AnalyticsRange;
  kpis: AnalyticsKPI[];
  daily: DailyMetric[];
  peakHours: HourBucket[];
  topItems: TopItem[];
  channels: {
    tableOrders: number;
    pickupOrders: number;
  };
};
