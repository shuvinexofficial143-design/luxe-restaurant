import AdminShell from "@/components/admin/AdminShell";
import CRMOverview from "@/components/admin/CRMOverview";
import CRMCustomerTable from "@/components/admin/CRMCustomerTable";
import CRMAudienceBuilder from "@/components/admin/CRMAudienceBuilder";
import CRMCampaignBuilder from "@/components/admin/CRMCampaignBuilder";

export const metadata = { title: "LUXE CRM" };

export default function CRMPage() {
  return (
    <AdminShell title="Customer CRM" eyebrow="Guest Intelligence">
      <div className="mx-auto max-w-[1320px]">
        <div className="rounded-[28px] bg-[#335f50] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
            Restaurant CRM
          </p>
          <h2 className="lx-serif mt-2 text-5xl">
            Know the guest, not just the booking.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
            CRM scoring combines database orders, reservations, loyalty and
            recency into segments and a 0–100 VIP score. Campaign tools save
            audiences as drafts; they do not auto-send messages.
          </p>
        </div>

        <div className="mt-5">
          <CRMOverview />
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_360px]">
          <CRMCustomerTable />
          <div className="space-y-4">
            <CRMAudienceBuilder />
            <CRMCampaignBuilder />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
