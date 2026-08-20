export default function SeasonalTicker() {
  const items = [
    "Summer tasting now serving",
    "Chef's Table Thu–Sun",
    "Wine pairing available",
    "Private dining for 6–54 guests",
  ];

  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#6b231d] py-4 text-white">
      <div className="lx-marquee">
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="mx-8 flex items-center gap-8 whitespace-nowrap text-[9px] uppercase tracking-[.3em] text-white/75"
          >
            {item}
            <span className="text-[#efb36c]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
