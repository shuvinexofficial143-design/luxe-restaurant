import Accordion, { AccordionItem } from "./Accordion";
import Reveal from "./Reveal";

const common: AccordionItem[] = [
  {
    question: "Do you accommodate dietary requirements?",
    answer:
      "Yes. Please share allergies and dietary requirements at least 24 hours before your reservation so the kitchen can prepare properly.",
  },
  {
    question: "How long is the tasting menu?",
    answer:
      "Most tasting-menu reservations last around two to two-and-a-half hours. Chef's Table evenings may run slightly longer.",
  },
  {
    question: "Can children dine at LUXE?",
    answer:
      "Children are welcome. Sunday brunch is the most relaxed service; for evening tasting menus, we recommend contacting the team before booking.",
  },
  {
    question: "Is the restaurant accessible?",
    answer:
      "The main entrance and dining room are step-free. Please add any accessibility requirements to your reservation so the team can prepare your table.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-[#fff8ed] py-24 md:py-32">
      <div className="lx-container grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
        <Reveal>
          <div>
            <p className="lx-kicker">Good to know</p>
            <h2 className="lx-serif mt-5 max-w-lg text-5xl leading-[.95] md:text-6xl">
              Before you book.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#645149]">
              A few details that make planning the evening easier.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <Accordion items={common} />
        </Reveal>
      </div>
    </section>
  );
}
