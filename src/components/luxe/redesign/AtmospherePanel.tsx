
export default function AtmospherePanel() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {[
        ["18:00", "doors open"],
        ["21°C", "cellar serving"],
        ["08", "chef table seats"],
      ].map(([value, label]) => (
        <div
          key={label}
          className="rounded-[20px] border border-[#e7c58f]/10 bg-[#0e0c09] p-5 text-center"
        >
          <p className="lx-serif text-3xl text-[#d8ae72]">{value}</p>
          <p className="mt-2 text-[7px] uppercase tracking-[.14em] text-white/28">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
