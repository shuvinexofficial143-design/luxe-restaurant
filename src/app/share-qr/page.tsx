import LuxeShell from "@/components/luxe/LuxeShell";
import ShareQRBuilder from "@/components/qr/ShareQRBuilder";

export const metadata = { title: "Share LUXE QR" };

export default function ShareQRPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1050px]">
          <p className="lx-kicker">Shareable access</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Turn a link into a scan.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            Create menu, reservation, event, gift-card or custom QR routes and
            share them from the device.
          </p>

          <div className="mt-6">
            <ShareQRBuilder />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
