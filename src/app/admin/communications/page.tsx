import AdminShell from "@/components/admin/AdminShell";
import CommunicationStatus from "@/components/admin/CommunicationStatus";
import CommunicationTemplatePreview from "@/components/admin/CommunicationTemplatePreview";
import CommunicationTestPanel from "@/components/admin/CommunicationTestPanel";
import NotificationDeliveryTable from "@/components/admin/NotificationDeliveryTable";
import {
  requireAdminPagePermission,
} from "@/lib/server/security/admin-guard";

export const metadata = {
  title: "LUXE Communications",
};

export const dynamic =
  "force-dynamic";

export default async function CommunicationsAdminPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell
      title="Communications"
      eyebrow="Email + WhatsApp"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="rounded-[28px] bg-[#335f50] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
            Consent-aware messaging
          </p>
          <h2 className="lx-serif mt-2 text-5xl">
            Operational alerts without fake delivery.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
            Messages are queued first, consent is checked before provider
            delivery, and SENT is recorded only after Resend or WhatsApp
            accepts the message.
          </p>
        </div>

        <div className="mt-5">
          <CommunicationStatus />
        </div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
          <CommunicationTemplatePreview />
          <CommunicationTestPanel />
        </div>

        <div className="mt-5">
          <NotificationDeliveryTable />
        </div>
      </div>
    </AdminShell>
  );
}
