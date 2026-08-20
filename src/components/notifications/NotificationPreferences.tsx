import Link from "next/link";

export default function NotificationPreferences() {
  return (
    <div className="rounded-[26px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
        Control the noise
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Choose what reaches you.</h2>
      <p className="mt-3 text-xs leading-6 text-white/55">
        Event, wine, offer, private-dining and booking-reminder preferences are
        controlled from one place.
      </p>

      <Link
        href="/newsletter/preferences"
        className="mt-5 inline-flex rounded-full bg-white px-4 py-3 text-[9px] uppercase tracking-[.12em] text-[#335f50]"
      >
        Manage preferences ↗
      </Link>
    </div>
  );
}
