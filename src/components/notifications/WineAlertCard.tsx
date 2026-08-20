import Link from "next/link";
import type { AlertPreview } from "@/lib/notifications/types";

export default function WineAlertCard({
  alert,
}: {
  alert: AlertPreview;
}) {
  return (
    <Link
      href={alert.href}
      className="block rounded-[20px] bg-[#201713] p-4 text-white"
    >
      <p className="text-[8px] uppercase tracking-[.12em] text-[#efc28b]">
        Wine alert
      </p>
      <p className="lx-serif mt-2 text-2xl">{alert.title}</p>
      <p className="mt-2 text-[10px] leading-5 text-white/50">{alert.text}</p>
      <span className="mt-3 inline-flex text-[8px] uppercase tracking-[.1em]">
        Open bottle ↗
      </span>
    </Link>
  );
}
