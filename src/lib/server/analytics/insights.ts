import type {
  AnalyticsOverview,
  ForecastPoint,
} from "./types";

export function deriveAnalyticsInsights(
  overview: AnalyticsOverview,
  forecast: ForecastPoint[]
) {
  const insights: {
    title: string;
    text: string;
    tone: "POSITIVE" | "ATTENTION" | "NEUTRAL";
  }[] = [];

  const revenue = overview.kpis.find(
    (item) => item.label === "Order revenue"
  );
  const confirmRate = overview.kpis.find(
    (item) => item.label === "Reservation confirm rate"
  );
  const busiest = [...overview.peakHours].sort(
    (a, b) => b.score - a.score
  )[0];

  if (
    revenue?.changePercent !== null &&
    revenue?.changePercent !== undefined
  ) {
    insights.push({
      title:
        revenue.changePercent >= 0
          ? "Revenue momentum"
          : "Revenue softness",
      text: `Order revenue is ${Math.abs(
        revenue.changePercent
      ).toFixed(1)}% ${
        revenue.changePercent >= 0 ? "above" : "below"
      } the previous comparable period.`,
      tone: revenue.changePercent >= 0 ? "POSITIVE" : "ATTENTION",
    });
  }

  if (busiest) {
    insights.push({
      title: "Peak service hour",
      text: `${busiest.hour} has the strongest combined reservation/order activity in the selected period.`,
      tone: "NEUTRAL",
    });
  }

  if (confirmRate && confirmRate.value < 70) {
    insights.push({
      title: "Reservation conversion",
      text: `Confirmed reservation rate is ${confirmRate.value.toFixed(
        1
      )}%. Review cancellations, deposit friction and slot availability.`,
      tone: "ATTENTION",
    });
  }

  const forecastPeak = [...forecast].sort(
    (a, b) =>
      b.expectedReservations +
      b.expectedOrders -
      (a.expectedReservations + a.expectedOrders)
  )[0];

  if (forecastPeak) {
    insights.push({
      title: "Forecasted busy day",
      text: `${forecastPeak.date} currently has the highest rule-based demand estimate for the next forecast window.`,
      tone: "NEUTRAL",
    });
  }

  return insights.slice(0, 6);
}
