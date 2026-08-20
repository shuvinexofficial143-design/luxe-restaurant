import Link from "next/link";

const links = [
  ["Overview", "/account"],
  ["Profile", "/account/profile"],
  ["Loyalty", "/account/loyalty"],
  ["VIP Membership", "/account/membership"],
];

export default function AccountNav() {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-1" aria-label="Account navigation">
      {links.map(([label, href]) => (
        <Link
          key={href}
          href={href}
          className="min-h-10 shrink-0 rounded-full border border-[#4a3025]/10 bg-[#fffaf4] px-4 py-3 text-[9px] uppercase tracking-[.12em]"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
