import { ApiError } from "@/lib/server/api/errors";
import type { AnalyticsRange } from "./types";

function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function defaultAnalyticsRange(days = 30): AnalyticsRange {
  const safeDays = Math.max(7, Math.min(180, Math.floor(days)));
  const to = new Date();
  const from = new Date(to);
  from.setDate(from.getDate() - (safeDays - 1));

  return {
    from: isoDate(from),
    to: isoDate(to),
    days: safeDays,
  };
}

export function parseAnalyticsRange(url: URL): AnalyticsRange {
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const days = Number(url.searchParams.get("days") || "30");

  if (!from || !to) {
    return defaultAnalyticsRange(Number.isFinite(days) ? days : 30);
  }

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(from) ||
    !/^\d{4}-\d{2}-\d{2}$/.test(to)
  ) {
    throw new ApiError(
      "INVALID_ANALYTICS_RANGE",
      "from and to must use YYYY-MM-DD.",
      422
    );
  }

  const fromMs = new Date(`${from}T00:00:00Z`).getTime();
  const toMs = new Date(`${to}T23:59:59Z`).getTime();
  const span = Math.floor((toMs - fromMs) / 86_400_000) + 1;

  if (!Number.isFinite(span) || span < 1 || span > 180) {
    throw new ApiError(
      "INVALID_ANALYTICS_RANGE",
      "Analytics range must be between 1 and 180 days.",
      422
    );
  }

  return { from, to, days: span };
}

export function previousRange(range: AnalyticsRange): AnalyticsRange {
  const previousTo = new Date(`${range.from}T00:00:00Z`);
  previousTo.setUTCDate(previousTo.getUTCDate() - 1);

  const previousFrom = new Date(previousTo);
  previousFrom.setUTCDate(
    previousFrom.getUTCDate() - (range.days - 1)
  );

  return {
    from: isoDate(previousFrom),
    to: isoDate(previousTo),
    days: range.days,
  };
}
