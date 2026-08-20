import Reveal from "./Reveal";

const quotes = [
  {
    quote: "A dining room that understands the difference between luxury and excess.",
    name: "The City Table",
    role: "Restaurant Review",
  },
  {
    quote: "The tasting menu feels composed, not constructed — every course leaves room for the next.",
    name: "Anika Rao",
    role: "Guest",
  },
  {
    quote: "Service is warm, the cellar is adventurous and the ember kitchen gives the menu its own voice.",
    name: "Weekend Ledger",
    role: "Dining Editor",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#fff8ed] py-24 md:py-32">
      <div className="lx-container">
        <Reveal>
          <div className="grid gap-8 border-b border-[#5b3429]/16 pb-10 md:grid-cols-[.7fr_1.3fr] md:items-end">
            <p className="lx-kicker">What they remember</p>
            <h2 className="lx-serif text-[clamp(3.8rem,6vw,6.6rem)] leading-[.9] tracking-[-.045em]">
              The room after the last course.
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {quotes.map((item, index) => (
            <Reveal key={item.name} delay={index * 100}>
              <article className="min-h-[340px] border border-[#5b3429]/14 bg-[#f5ead5] p-8 md:p-9">
                <p className="lx-serif text-3xl leading-tight text-[#2d1a15]">“{item.quote}”</p>
                <div className="mt-12 border-t border-[#5b3429]/14 pt-5">
                  <p className="text-[10px] uppercase tracking-[.22em] text-[#7a2d21]">{item.name}</p>
                  <p className="mt-2 text-xs text-[#7a675e]">{item.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
