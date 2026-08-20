import Reveal from "./Reveal";

const items = [
  ["Warm light", "Low, amber lighting designed around the table."],
  ["Open fire", "The ember hearth remains visible through service."],
  ["Quiet music", "A late-evening soundtrack that sits behind conversation."],
  ["Unhurried pace", "Courses are spaced to let the room breathe."],
];

export default function AmbienceStrip() {
  return (
    <section className="bg-[#6b231d] py-20 text-white md:py-24">
      <div className="lx-container">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[.32em] text-[#ffd19c]">Atmosphere</p>
          <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4">
            {items.map(([title, text], index) => (
              <article
                key={title}
                className="min-h-[240px] border-b border-white/12 p-6 md:border-r xl:border-b-0"
              >
                <p className="text-[9px] uppercase tracking-[.24em] text-[#ffd19c]">0{index + 1}</p>
                <h3 className="lx-serif mt-8 text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{text}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
