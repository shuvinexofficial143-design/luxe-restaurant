import Reveal from "./Reveal";

const moments = [
  {
    label: "Arrival",
    time: "6:30 PM",
    text: "A first drink, warm light and the room settling into service.",
  },
  {
    label: "First course",
    time: "7:10 PM",
    text: "Bright, chilled and precise — the menu begins with appetite rather than weight.",
  },
  {
    label: "At the hearth",
    time: "8:00 PM",
    text: "Smoke and caramelisation arrive as the ember kitchen takes over the middle of the menu.",
  },
  {
    label: "Last pour",
    time: "9:45 PM",
    text: "Dessert, something from the cellar and enough time left at the table to stay.",
  },
];

export default function DiningMoments() {
  return (
    <section className="bg-[#24493f] py-24 text-white md:py-32">
      <div className="lx-container">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[.34em] text-[#e7c18c]">An evening at LUXE</p>
          <h2 className="lx-serif mt-5 max-w-4xl text-[clamp(3.8rem,7vw,7rem)] leading-[.9] tracking-[-.045em]">
            The night has a rhythm.
          </h2>
        </Reveal>

        <div className="mt-14 divide-y divide-white/12 border-y border-white/12">
          {moments.map((moment, index) => (
            <Reveal key={moment.label} delay={index * 70}>
              <div className="grid gap-5 py-8 md:grid-cols-[100px_170px_1fr] md:items-start">
                <span className="text-[9px] uppercase tracking-[.24em] text-[#e7c18c]">0{index + 1}</span>
                <div>
                  <p className="lx-serif text-3xl">{moment.label}</p>
                  <p className="mt-2 text-[9px] uppercase tracking-[.2em] text-white/36">{moment.time}</p>
                </div>
                <p className="max-w-2xl text-sm leading-7 text-white/62">{moment.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
