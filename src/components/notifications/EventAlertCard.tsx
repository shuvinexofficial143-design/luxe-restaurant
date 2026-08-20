import Link from "next/link";
import type { AlertPreview } from "@/lib/notifications/types";

export default function EventAlertCard({
  alert,
}: {
  alert: AlertPreview;
}) {
  return (
    <Link
      href={alert.href}
      className="block rounded-[20px] bg-[#7c241e] p-4 text-white"
    >
      <p className="text-[8px] uppercase tracking-[.12em] text-[#ffd0aa]">
        Event alert
      </p>
      <p className="lx-serif mt-2 text-2xl">{alert.title}</p>
      <p className="mt-2 text-[10px] leading-5 text-white/55">{alert.text}</p>
      <span className="mt-3 inline-flex text-[8px] uppercase tracking-[.1em]">
        View event ↗
      </span>
    </Link>
  );
}
