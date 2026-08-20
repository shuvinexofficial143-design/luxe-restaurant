import type { ForecastPoint } from "@/lib/server/analytics/types";

export default function ForecastPanel({
  forecast,
}: {
  forecast: ForecastPoint[];
}) {
  return (
    <div className="rounded-[26px] bg-[#7c241e] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
        7-day demand forecast
      </p>
      <h2 className="lx-serif mt-2 text-3xl">
        Historical-pattern estimate.
      </h2>
      <p className="mt-2 text-[9px] leading-5 text-white/50">
        Uses weekday and recent averages only. This is not an external AI
        model and should not be treated as guaranteed demand.
      </p>

      <div className="mt-5 space-y-2">
        {forecast.map((item) => (
          <div
            key={item.date}
            className="grid grid-cols-[82px_1fr_auto] items-center gap-3 rounded-[15px] bg-white/[.07] p-3"
          >
            <div>
              <p className="text-[9px]">{item.date}</p>
              <p className="mt-1 text-[7px] uppercase tracking-[.08em] text-white/35">
                {item.confidence}
              </p>
            </div>
            <div className="text-[9px] leading-5 text-white/60">
              <p>{item.expectedReservations} reservations</p>
              <p>{item.expectedOrders} orders</p>
            </div>
            <p className="lx-serif text-xl text-[#ffd0aa]">
              ₹
              {Math.round(
                item.expectedRevenue
              ).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
