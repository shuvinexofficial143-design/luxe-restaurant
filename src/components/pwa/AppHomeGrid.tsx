import Link from "next/link";

const items = [
  ["Menu", "Browse dishes and filters.", "/menu", "🍽"],
  ["Book", "Choose time, area and table.", "/reservations", "◷"],
  ["Order", "Pickup or table ordering.", "/order", "🛍"],
  ["Wine", "Cellar + sommelier assistant.", "/wine", "🍷"],
  ["Events", "Dining events and tickets.", "/events", "🎟"],
  ["QR Menu", "Open shareable menu QR.", "/qr-menu", "▦"],
  ["Table QR", "Launch table-side ordering.", "/table-order", "⌗"],
  ["Concierge", "Bilingual restaurant assistant.", "/concierge", "✦"],
];

export default function AppHomeGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {items.map(([title, text, href, icon]) => (
        <Link
          key={href}
          href={href}
          className="rounded-[22px] border border-[#4a3025]/10 bg-[#fffaf4] p-4"
        >
          <span className="text-2xl">{icon}</span>
          <p className="lx-serif mt-3 text-2xl">{title}</p>
          <p className="mt-2 text-[10px] leading-5 text-[#75645d]">{text}</p>
        </Link>
      ))}
    </div>
  );
}
