import LuxeShell from "@/components/luxe/LuxeShell";
import QRHistory from "@/components/qr/QRHistory";

export const metadata = { title: "QR History" };

export default function QRHistoryPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[820px]">
          <p className="lx-kicker">Saved locally</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            QR history.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Keep a local list of table, reservation, event, gift and custom QR routes.
          </p>

          <div className="mt-6">
            <QRHistory />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
