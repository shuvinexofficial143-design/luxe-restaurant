import LuxeShell from "@/components/luxe/LuxeShell";
import CommunicationPreferences from "@/components/account/CommunicationPreferences";
import NotificationHistory from "@/components/account/NotificationHistory";

export const metadata = {
  title: "Communication Preferences · LUXE",
};

export default function CommunicationsPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[980px]">
          <div className="rounded-[30px] bg-[#335f50] p-6 text-white">
            <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
              Account preferences
            </p>
            <h1 className="lx-serif mt-2 text-5xl">
              Messages on your terms.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              Operational alerts and promotional messages are controlled
              separately. WhatsApp promotional communication is off by
              default until explicitly enabled.
            </p>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_360px]">
            <CommunicationPreferences />
            <NotificationHistory />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
