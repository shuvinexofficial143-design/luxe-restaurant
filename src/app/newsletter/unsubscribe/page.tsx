import LuxeShell from "@/components/luxe/LuxeShell";
import UnsubscribeForm from "@/components/notifications/UnsubscribeForm";

export const metadata = { title: "Unsubscribe" };

export default function UnsubscribePage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[700px]">
          <p className="lx-kicker">LUXE Notes</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Change the volume.
          </h1>

          <div className="mt-6">
            <UnsubscribeForm />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
