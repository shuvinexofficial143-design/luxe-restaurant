import AdminShell from "@/components/admin/AdminShell";
import ReviewManager from "@/components/admin/ReviewManager";

export const metadata = { title: "Admin Reviews" };

export default function AdminReviewsPage() {
  return (
    <AdminShell title="Reviews" eyebrow="Guest Voice">
      <div className="mx-auto max-w-[1320px]">
        <p className="mb-4 max-w-2xl text-sm leading-7 text-[#75645d]">
          Inspect locally submitted guest reviews and remove demo entries from
          this browser.
        </p>
        <ReviewManager />
      </div>
    </AdminShell>
  );
}
