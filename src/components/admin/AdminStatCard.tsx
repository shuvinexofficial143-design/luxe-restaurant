import Link from "next/link";

export default function AdminStatCard({
  label,
  value,
  detail,
  href,
}: {
  label: string;
  value: string;
  detail: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-[22px] border border-[#4a3025]/10 bg-[#fffaf4] p-5"
    >
      <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
        {label}
      </p>
      <p className="lx-serif mt-2 text-4xl">{value}</p>
      <div className="mt-3 flex items-end justify-between gap-3">
        <p className="text-[10px] leading-5 text-[#75645d]">{detail}</p>
        <span className="text-[#7c241e]">↗</span>
      </div>
    </Link>
  );
}
