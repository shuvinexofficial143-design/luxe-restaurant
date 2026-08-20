import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import CRMCustomerDetail from "@/components/admin/CRMCustomerDetail";

export const metadata = { title: "CRM Customer" };

export default async function CRMCustomerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AdminShell title="Customer Intelligence" eyebrow="CRM Profile">
      <div className="mx-auto max-w-[1180px]">
        <Link
          href="/admin/crm"
          className="mb-4 inline-flex rounded-full border border-[#4a3025]/10 bg-white px-4 py-3 text-[8px] uppercase tracking-[.1em]"
        >
          ← CRM
        </Link>
        <CRMCustomerDetail customerId={id} />
      </div>
    </AdminShell>
  );
}
