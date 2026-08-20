import AdminShell from "@/components/admin/AdminShell";
import AnalyticsDashboardClient from "@/components/admin/AnalyticsDashboardClient";

export const metadata = { title: "Demand Forecast" };

export default function ForecastPage() {
  return (
    <AdminShell title="Demand Forecast" eyebrow="Predictive Foundation">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-5 rounded-[24px] bg-[#7c241e] p-5 text-white">
          <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
            Methodology
          </p>
          <p className="mt-2 text-sm leading-7 text-white/60">
            Forecasts use recent and same-weekday historical averages. They are
            planning signals, not guaranteed future demand.
          </p>
        </div>
        <AnalyticsDashboardClient />
      </div>
    </AdminShell>
  );
}
