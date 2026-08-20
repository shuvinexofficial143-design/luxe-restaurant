import AdminShell from "@/components/admin/AdminShell";
import AnalyticsDashboardClient from "@/components/admin/AnalyticsDashboardClient";

export const metadata = { title: "LUXE Advanced Analytics" };

export default function AdminAnalyticsPage() {
  return (
    <AdminShell title="Advanced Analytics" eyebrow="Restaurant Intelligence">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-5 rounded-[28px] bg-[#335f50] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
            Live business intelligence
          </p>
          <h2 className="lx-serif mt-2 text-5xl">
            Revenue, demand, guests and operations.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
            Metrics are calculated from database reservations, orders, customers
            and order items. Forecasting uses historical averages only and is
            labelled with low/medium confidence rather than pretending to be AI.
          </p>
        </div>

        <AnalyticsDashboardClient />
      </div>
    </AdminShell>
  );
}
