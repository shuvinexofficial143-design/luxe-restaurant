import { formatAdminMoney } from "@/lib/admin/analytics";
import type { AdminAnalytics } from "@/lib/admin/types";

function Bar({
  label,
  value,
  max,
}: {
  label: string;
  value: number;
  max: number;
}) {
  const percent = max > 0 ? Math.max(4, Math.round((value / max) * 100)) : 4;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span className="text-[9px] uppercase tracking-[.1em] text-[#75645d]">
          {label}
        </span>
        <span className="lx-serif text-xl">{value}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#e5d9cd]">
        <div
          className="h-full rounded-full bg-[#7c241e]"
          style={{ width: `${Math.min(100, percent)}%` }}
        />
      </div>
    </div>
  );
}

export default function AnalyticsCharts({
  analytics,
}: {
  analytics: AdminAnalytics;
}) {
  const counts = [
    analytics.reservations,
    analytics.orders,
    analytics.eventBookings,
    analytics.privateDining,
    analytics.reviews,
    analytics.gifts,
    analytics.careerApplications,
  ];
  const max = Math.max(1, ...counts);

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
      <div className="rounded-[26px] bg-[#fffaf4] p-5">
        <p className="lx-kicker">Activity mix</p>
        <h3 className="lx-serif mt-2 text-3xl">Browser-local volume.</h3>

        <div className="mt-5 space-y-4">
          <Bar label="Reservations" value={analytics.reservations} max={max} />
          <Bar label="Orders" value={analytics.orders} max={max} />
          <Bar label="Events" value={analytics.eventBookings} max={max} />
          <Bar label="Private dining" value={analytics.privateDining} max={max} />
          <Bar label="Reviews" value={analytics.reviews} max={max} />
          <Bar label="Gift cards" value={analytics.gifts} max={max} />
          <Bar label="Careers" value={analytics.careerApplications} max={max} />
        </div>
      </div>

      <div className="rounded-[26px] bg-[#335f50] p-5 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
          Demo value signals
        </p>
        <h3 className="lx-serif mt-2 text-3xl">Commercial snapshot.</h3>

        <div className="mt-5 space-y-2">
          {[
            ["Order value", formatAdminMoney(analytics.orderRevenue)],
            ["Event booking value", formatAdminMoney(analytics.eventRevenue)],
            ["Private dining pipeline", formatAdminMoney(analytics.privateDiningPipeline)],
            ["Gift-card value", formatAdminMoney(analytics.giftValue)],
            ["Average rating", analytics.averageRating ? analytics.averageRating.toFixed(1) : "—"],
            ["Needs attention", String(analytics.unreadWork)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 rounded-[15px] bg-white/[.07] p-3"
            >
              <span className="text-[10px] text-white/45">{label}</span>
              <span className="lx-serif text-xl text-[#efc99a]">{value}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[9px] leading-5 text-white/40">
          These are portfolio demo metrics, not audited restaurant financials.
        </p>
      </div>
    </div>
  );
}
