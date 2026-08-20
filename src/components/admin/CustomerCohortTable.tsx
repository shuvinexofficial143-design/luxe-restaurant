import type { CohortRow } from "@/lib/server/analytics/types";

export default function CustomerCohortTable({
  rows,
}: {
  rows: CohortRow[];
}) {
  return (
    <div className="overflow-hidden rounded-[24px] bg-[#fffaf4]">
      <div className="p-5">
        <p className="lx-kicker">Customer cohorts</p>
        <h2 className="lx-serif mt-2 text-3xl">
          Signup month → recent activity.
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[680px] w-full">
          <thead className="bg-[#201713] text-white">
            <tr>
              {[
                "Cohort",
                "Customers",
                "Active 30d",
                "Retention",
                "Order value",
              ].map((label) => (
                <th
                  key={label}
                  className="px-4 py-4 text-left text-[8px] font-normal uppercase tracking-[.09em]"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#4a3025]/8">
            {rows.map((row) => (
              <tr key={row.cohort}>
                <td className="px-4 py-4 lx-serif text-xl">
                  {row.cohort}
                </td>
                <td className="px-4 py-4 text-sm">
                  {row.customers}
                </td>
                <td className="px-4 py-4 text-sm">
                  {row.active30d}
                </td>
                <td className="px-4 py-4 text-sm">
                  {row.retentionPercent.toFixed(1)}%
                </td>
                <td className="px-4 py-4 text-sm">
                  ₹{Math.round(row.orderValue).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
