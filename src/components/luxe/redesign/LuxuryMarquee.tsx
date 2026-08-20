
const items = [
  "LIVE FIRE",
  "SEASONAL PLATES",
  "CURATED WINE",
  "CHEF'S TABLE",
  "QUIET HOSPITALITY",
  "UJJAIN",
];

export default function LuxuryMarquee() {
  return (
    <div className="overflow-hidden border-y border-[#e7c58f]/10 py-3">
      <div className="flex min-w-max animate-[luxe-marquee_28s_linear_infinite] items-center gap-8 text-[7px] uppercase tracking-[.24em] text-[#9f7d53] motion-reduce:animate-none">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-8">
            {item}
            <i className="h-1 w-1 rounded-full bg-[#c9944b]" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes luxe-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
