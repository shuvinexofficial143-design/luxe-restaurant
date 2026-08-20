
import Link from "next/link";

const items = [
  ["Chef's Fire Table", "8 seats · open kitchen", "/experiences/chefs-table"],
  ["Cellar Evening", "wine-led monthly dinner", "/experiences/wine-pairing-evening"],
  ["Private Dining", "crafted for your table", "/private-dining"],
];

export default function ExperienceStrip() {
  return (
    <div className="grid gap-2 md:grid-cols-3">
      {items.map(([title, detail, href]) => (
        <Link
          key={title}
          href={href}
          className="group rounded-[22px] border border-[#e7c58f]/12 bg-white/[.018] p-5 transition hover:border-[#d7a65e]/32 hover:bg-white/[.028]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="lx-serif text-2xl text-[#f0e2cf]">{title}</p>
              <p className="mt-2 text-[9px] uppercase tracking-[.12em] text-white/30">
                {detail}
              </p>
            </div>
            <span className="text-[#c9944b] transition-transform group-hover:translate-x-1">
              ↗
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
