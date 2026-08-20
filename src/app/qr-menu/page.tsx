import LuxeShell from "@/components/luxe/LuxeShell";
import QRMenuCard from "@/components/qr/QRMenuCard";
import { qrQuickLinks } from "@/lib/qr/data";
import QRCodeCard from "@/components/qr/QRCodeCard";

export const metadata = { title: "QR Menu" };

export default function QRMenuPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Scan to dine</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">QR Menu.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            A scannable menu route plus QR shortcuts for wine, bookings and events.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <QRMenuCard />

            <div className="space-y-4">
              {qrQuickLinks.slice(1).map((item) => (
                <QRCodeCard
                  key={item.id}
                  title={item.title}
                  path={item.path}
                  subtitle={item.text}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
