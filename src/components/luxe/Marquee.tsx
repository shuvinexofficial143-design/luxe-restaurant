export default function Marquee() {
  const words = ["FIRE", "SEASON", "WINE", "CRAFT", "MEMORY", "PROVENANCE"];
  const repeated = [...words, ...words];
  return (
    <div className="overflow-hidden border-y border-[#49281f]/15 bg-[#fff8ed] py-5">
      <div className="lx-marquee">
        {repeated.map((word, i) => (
          <span key={`${word}-${i}`} className="mx-8 flex items-center gap-8 text-[11px] uppercase tracking-[.34em] text-[#6f3326]">
            {word} <span className="text-[#c67d4c]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
