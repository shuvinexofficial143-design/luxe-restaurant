import type { AnalyticsKPI } from "@/lib/server/analytics/types";

function formatValue(kpi: AnalyticsKPI) {
  if (kpi.format === "CURRENCY") {
    return `₹${Math.round(kpi.value).toLocaleString("en-IN")}`;
  }

  if (kpi.format === "PERCENT") {
    return `${kpi.value.toFixed(1)}%`;
  }

  return Math.round(kpi.value).toLocaleString("en-IN");
}

export default function AnalyticsKPIGrid({
  items,
}: {
  items: AnalyticsKPI[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <article
          key={item.label}
          className="rounded-[20px] bg-[#fffaf4] p-4"
        >
          <p className="lx-serif text-3xl text-[#7c241e]">
            {formatValue(item)}
          </p>
          <p className="mt-2 text-[8px] uppercase tracking-[.09em] text-[#75645d]">
            {item.label}
          </p>
          {item.changePercent !== null ? (
            <p
              className={`mt-2 text-[9px] ${
                item.changePercent >= 0
                  ? "text-[#335f50]"
                  : "text-[#7c241e]"
              }`}
            >
              {item.changePercent >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(item.changePercent).toFixed(1)}% vs previous
            </p>
          ) : null}
        </article>
      ))}
    </div>
  );
}
