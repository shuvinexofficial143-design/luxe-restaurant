import Reveal from "./Reveal";

const stats = [
  ["4.9", "Guest rating", "Demo rating display"],
  ["12", "Tables", "Intimate dining room"],
  ["07", "Courses", "Seasonal tasting"],
  ["54", "Guests", "Largest private event"],
];

export default function SocialProofRail() {
  return (
    <section className="bg-[#24493f] text-white">
      <div className="lx-container grid sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([value, label, note], index) => (
          <Reveal key={label} delay={index * 70}>
            <div className="min-h-[220px] border-b border-white/10 p-7 sm:border-r xl:border-b-0">
              <p className="lx-serif text-6xl text-[#e7c18c]">{value}</p>
              <p className="lx-serif mt-5 text-2xl">{label}</p>
              <p className="mt-3 text-xs leading-6 text-white/42">{note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
