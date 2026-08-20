import type {
  DailyMetric,
  ForecastPoint,
} from "./types";

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function weekdayIndex(date: string) {
  return new Date(`${date}T12:00:00Z`).getUTCDay();
}

export function buildDemandForecast(
  daily: DailyMetric[],
  days = 7
): ForecastPoint[] {
  if (!daily.length) return [];

  const next: ForecastPoint[] = [];
  const lastDate = new Date(
    `${daily[daily.length - 1].date}T12:00:00Z`
  );

  for (let offset = 1; offset <= days; offset += 1) {
    const target = new Date(lastDate);
    target.setUTCDate(target.getUTCDate() + offset);
    const date = target.toISOString().slice(0, 10);
    const weekday = weekdayIndex(date);

    const sameWeekday = daily.filter(
      (item) => weekdayIndex(item.date) === weekday
    );
    const recent = daily.slice(-14);
    const source =
      sameWeekday.length >= 2 ? sameWeekday.slice(-6) : recent;

    const expectedReservations = Math.round(
      average(source.map((item) => item.reservations))
    );
    const expectedOrders = Math.round(
      average(source.map((item) => item.orders))
    );
    const expectedRevenue = Math.round(
      average(source.map((item) => item.revenue))
    );

    next.push({
      date,
      expectedReservations,
      expectedOrders,
      expectedRevenue,
      confidence:
        sameWeekday.length >= 3 && daily.length >= 21
          ? "MEDIUM"
          : "LOW",
    });
  }

  return next;
}
