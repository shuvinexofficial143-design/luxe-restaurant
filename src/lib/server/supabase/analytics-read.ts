import { buildAnalyticsOverview } from "@/lib/server/analytics/metrics";
import { buildCustomerCohorts } from "@/lib/server/analytics/cohorts";
import { buildDemandForecast } from "@/lib/server/analytics/forecast";
import { deriveAnalyticsInsights } from "@/lib/server/analytics/insights";
import type { AnalyticsRange } from "@/lib/server/analytics/types";

export async function loadAnalyticsBundle(range: AnalyticsRange) {
  const [overview, cohorts] = await Promise.all([
    buildAnalyticsOverview(range),
    buildCustomerCohorts(6),
  ]);

  const forecast = buildDemandForecast(overview.daily, 7);
  const insights = deriveAnalyticsInsights(overview, forecast);

  return {
    overview,
    cohorts,
    forecast,
    insights,
  };
}
