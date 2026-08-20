import AdminShell from "@/components/admin/AdminShell";
import AnalyticsDashboardClient from "@/components/admin/AnalyticsDashboardClient";

export const metadata = { title: "Customer Analytics" };

export default function CustomerAnalyticsPage() {
  return (
    <AdminShell title="Customer Analytics" eyebrow="Cohorts + Retention">
      <div className="mx-auto max-w-[1180px]">
        <AnalyticsDashboardClient />
      </div>
    </AdminShell>
  );
}
