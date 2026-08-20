import AdminShell from "@/components/admin/AdminShell";
import IntegrationStatus from "@/components/admin/IntegrationStatus";
import PaymentProviderCard from "@/components/admin/PaymentProviderCard";
import EmailProviderCard from "@/components/admin/EmailProviderCard";
import WhatsAppProviderCard from "@/components/admin/WhatsAppProviderCard";
import IntegrationSetupGuide from "@/components/admin/IntegrationSetupGuide";
import IntegrationEndpointGrid from "@/components/admin/IntegrationEndpointGrid";

export const metadata = { title: "LUXE Integrations" };

export default function AdminIntegrationsPage() {
  return (
    <AdminShell title="Integrations" eyebrow="Payments + Messaging">
      <div className="mx-auto max-w-[1180px]">
        <div className="rounded-[28px] bg-[#fff4de] p-5">
          <p className="text-[9px] uppercase tracking-[.12em] text-[#8a5a21]">
            Real-service foundation
          </p>
          <h2 className="lx-serif mt-2 text-4xl">
            No fake delivery. No fake payment.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#75645d]">
            These integrations make real network calls only when credentials are
            configured and an explicit API action is triggered. Configuration
            checks never send a payment, email or WhatsApp message.
          </p>
        </div>

        <div className="mt-5">
          <IntegrationStatus />
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          <PaymentProviderCard />
          <EmailProviderCard />
          <WhatsAppProviderCard />
        </div>

        <div className="mt-7">
          <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            Server endpoints
          </p>
          <h2 className="lx-serif mt-2 text-4xl">Real integration routes.</h2>
          <div className="mt-4">
            <IntegrationEndpointGrid />
          </div>
        </div>

        <div className="mt-7">
          <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
            Setup
          </p>
          <h2 className="lx-serif mt-2 text-4xl">Connect providers safely.</h2>
          <div className="mt-4">
            <IntegrationSetupGuide />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
