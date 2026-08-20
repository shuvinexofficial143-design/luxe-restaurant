import AdminShell from "@/components/admin/AdminShell";
import CRMAudienceBuilder from "@/components/admin/CRMAudienceBuilder";
import CRMCampaignBuilder from "@/components/admin/CRMCampaignBuilder";
import CRMInsightsPanel from "@/components/admin/CRMInsightsPanel";

export const metadata = { title: "CRM Audiences" };

export default function CRMAudiencesPage() {
  return (
    <AdminShell title="CRM Audiences" eyebrow="Segmentation">
      <div className="mx-auto max-w-[1050px]">
        <CRMInsightsPanel />

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <CRMAudienceBuilder />
          <CRMCampaignBuilder />
        </div>

        <div className="mt-5 rounded-[20px] bg-[#fff4de] p-4">
          <p className="text-[9px] uppercase tracking-[.1em] text-[#8a5a21]">
            Consent-first foundation
          </p>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">
            Audience preview excludes do-not-contact guests by default. Saving
            a campaign creates a DRAFT only and does not send email or WhatsApp.
          </p>
        </div>
      </div>
    </AdminShell>
  );
}
