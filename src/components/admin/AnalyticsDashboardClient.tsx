"use client";

import { useEffect, useState } from "react";
import type {
  AnalyticsOverview,
  CohortRow,
  ForecastPoint,
} from "@/lib/server/analytics/types";
import AnalyticsFilters from "./AnalyticsFilters";
import AnalyticsKPIGrid from "./AnalyticsKPIGrid";
import RevenueTrendChart from "./RevenueTrendChart";
import ReservationDemandChart from "./ReservationDemandChart";
import OrderTrendChart from "./OrderTrendChart";
import CustomerCohortTable from "./CustomerCohortTable";
import ForecastPanel from "./ForecastPanel";
import PeakHoursHeatmap from "./PeakHoursHeatmap";
import ChannelMixCard from "./ChannelMixCard";
import TopItemsTable from "./TopItemsTable";
import InsightCards, { type AnalyticsInsight } from "./InsightCards";

type Bundle = {
  overview: AnalyticsOverview;
  cohorts: CohortRow[];
  forecast: ForecastPoint[];
  insights: AnalyticsInsight[];
};

export default function AnalyticsDashboardClient() {
  const [days, setDays] = useState(30);
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [message, setMessage] = useState("Loading analytics…");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setMessage("Loading analytics…");

      try {
        const [overviewResponse, customerResponse, forecastResponse] =
          await Promise.all([
            fetch(`/api/v1/analytics/overview?days=${days}`, {
              cache: "no-store",
            }),
            fetch("/api/v1/analytics/customers", {
              cache: "no-store",
            }),
            fetch(`/api/v1/analytics/forecast?days=${days}`, {
              cache: "no-store",
            }),
          ]);

        const overviewPayload = (await overviewResponse.json()) as {
          ok?: boolean;
          data?: AnalyticsOverview;
          error?: { message?: string };
        };
        const customerPayload = (await customerResponse.json()) as {
          ok?: boolean;
          data?: { cohorts?: CohortRow[] };
        };
        const forecastPayload = (await forecastResponse.json()) as {
          ok?: boolean;
          data?: {
            forecast?: ForecastPoint[];
            insights?: AnalyticsInsight[];
          };
        };

        if (
          !overviewResponse.ok ||
          !overviewPayload.ok ||
          !overviewPayload.data
        ) {
          throw new Error(
            overviewPayload.error?.message ||
              "Analytics overview could not be loaded."
          );
        }

        if (!cancelled) {
          setBundle({
            overview: overviewPayload.data,
            cohorts: customerPayload.data?.cohorts || [],
            forecast: forecastPayload.data?.forecast || [],
            insights: forecastPayload.data?.insights || [],
          });
          setMessage("");
        }
      } catch (error) {
        if (!cancelled) {
          setBundle(null);
          setMessage(
            error instanceof Error
              ? error.message
              : "Analytics could not be loaded."
          );
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [days]);

  return (
    <div className="space-y-5">
      <AnalyticsFilters days={days} onDays={setDays} />

      {!bundle ? (
        <div className="rounded-[24px] bg-[#fff4de] p-5">
          <p className="lx-serif text-3xl">{message}</p>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">
            Analytics requires the connected database and relevant migrations.
          </p>
        </div>
      ) : (
        <>
          <AnalyticsKPIGrid items={bundle.overview.kpis} />
          <InsightCards items={bundle.insights} />

          <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
            <RevenueTrendChart data={bundle.overview.daily} />
            <OrderTrendChart data={bundle.overview.daily} />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <ReservationDemandChart data={bundle.overview.daily} />
            <PeakHoursHeatmap rows={bundle.overview.peakHours} />
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
            <TopItemsTable items={bundle.overview.topItems} />
            <ChannelMixCard
              tableOrders={bundle.overview.channels.tableOrders}
              pickupOrders={bundle.overview.channels.pickupOrders}
            />
          </div>

          <div className="grid gap-4 xl:grid-cols-[1fr_390px]">
            <CustomerCohortTable rows={bundle.cohorts} />
            <ForecastPanel forecast={bundle.forecast} />
          </div>
        </>
      )}
    </div>
  );
}
