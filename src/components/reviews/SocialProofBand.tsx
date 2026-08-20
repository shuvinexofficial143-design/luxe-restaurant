import { socialStats } from "@/lib/reviews/data";

export default function SocialProofBand() {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-[28px] bg-[#335f50] p-4 text-white md:grid-cols-4 md:p-5">
      {socialStats.map((stat) => (
        <div key={stat.label} className="rounded-[18px] bg-white/[.06] p-4 text-center">
          <p className="lx-serif text-3xl text-[#efc99a]">{stat.value}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-white/45">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
