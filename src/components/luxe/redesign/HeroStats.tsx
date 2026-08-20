
const stats = [
  ["4.9", "guest love"],
  ["12", "signature plates"],
  ["8", "chef table seats"],
];

export default function HeroStats() {
  return (
    <div className="grid grid-cols-3 divide-x divide-[#e7c58f]/10 rounded-[22px] border border-[#e7c58f]/12 bg-black/25 backdrop-blur-md">
      {stats.map(([value, label]) => (
        <div key={label} className="px-3 py-4 text-center">
          <p className="lx-serif text-2xl text-[#e7c58f]">{value}</p>
          <p className="mt-1 text-[7px] uppercase tracking-[.12em] text-white/38">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
