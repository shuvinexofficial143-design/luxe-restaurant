import AdminShell from "@/components/admin/AdminShell";
import CommunicationTemplatePreview from "@/components/admin/CommunicationTemplatePreview";
import { requireAdminPagePermission } from "@/lib/server/security/admin-guard";

export const metadata = {
  title: "Communication Templates · LUXE",
};

export const dynamic = "force-dynamic";

export default async function CommunicationTemplatesPage() {
  await requireAdminPagePermission(
    "security.view"
  );

  return (
    <AdminShell
      title="Communication Templates"
      eyebrow="Transactional Messaging"
    >
      <div className="mx-auto max-w-[920px]">
        <div className="rounded-[28px] bg-[#201713] p-6 text-white">
          <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
            Template registry
          </p>
          <h1 className="lx-serif mt-2 text-5xl">
            Messages tied to real events.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
            Reservation confirmations and order-ready alerts are generated from
            trusted database events. Promotional campaigns remain separate and
            require explicit opt-in preferences.
          </p>
        </div>

        <div className="mt-5">
          <CommunicationTemplatePreview />
        </div>
      </div>
    </AdminShell>
  );
}
