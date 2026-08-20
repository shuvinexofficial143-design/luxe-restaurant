import { eventAlerts, wineAlerts } from "@/lib/notifications/data";
import EventAlertCard from "./EventAlertCard";
import WineAlertCard from "./WineAlertCard";

export default function DigestPreview() {
  return (
    <div className="rounded-[28px] bg-[#efe6dd] p-4 md:p-6">
      <p className="lx-kicker">Weekly digest preview</p>
      <h2 className="lx-serif mt-2 text-4xl">One email. The good parts.</h2>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <EventAlertCard alert={eventAlerts[0]} />
        <WineAlertCard alert={wineAlerts[0]} />
      </div>

      <div className="mt-3 rounded-[18px] bg-[#fffaf4] p-4">
        <p className="text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
          Also inside
        </p>
        <p className="mt-2 text-xs leading-6 text-[#75645d]">
          Seasonal menu note · one offer · private dining highlight · booking
          reminder shortcut.
        </p>
      </div>
    </div>
  );
}
