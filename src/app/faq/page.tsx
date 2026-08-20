import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import Accordion, { AccordionItem } from "@/components/luxe/Accordion";
import ReservationCTA from "@/components/luxe/ReservationCTA";

const items: AccordionItem[] = [
  {
    question: "What is the dress code?",
    answer:
      "Smart evening wear is encouraged, but jackets are not required. We want the room to feel polished without feeling formal.",
  },
  {
    question: "Do you offer vegetarian or vegan tasting menus?",
    answer:
      "Vegetarian menus are available with advance notice. Vegan menus may be possible on selected dates; please contact the team before reserving.",
  },
  {
    question: "How are allergies handled?",
    answer:
      "List all allergies in your reservation request. For serious or complex allergies, the team may contact you before confirming the booking.",
  },
  {
    question: "Can I bring my own wine?",
    answer:
      "Corkage may be available on selected bottles and dates. Please contact the sommelier team in advance.",
  },
  {
    question: "Do you accept walk-ins?",
    answer:
      "A small number of bar and lounge seats may be available, but reservations are strongly recommended for the dining room.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "For a real launch, connect this page to your actual reservation policy. This portfolio demo intentionally does not claim a live cancellation charge.",
  },
  {
    question: "Can you host proposals or celebrations?",
    answer:
      "Yes. Add the occasion to your reservation or contact Private Dining for more elaborate arrangements.",
  },
  {
    question: "Is parking available?",
    answer:
      "The demo venue includes valet arrival from 5:45 PM. Replace this with the restaurant's real parking information before launch.",
  },
];

export default function FAQPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Good to know"
        title="Questions"
        text="Everything guests usually ask before arriving — from timing and dress to allergies, celebrations and accessibility."
        image="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#fff8ed] py-24 md:py-32">
        <div className="lx-container grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
          <div>
            <p className="lx-kicker">Frequently asked</p>
            <h2 className="lx-serif mt-5 max-w-lg text-5xl leading-[.95] md:text-6xl">
              Plan the evening with confidence.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-[#645149]">
              If your question is not covered here, the contact team can help before your visit.
            </p>
          </div>
          <Accordion items={items} />
        </div>
      </section>

      <ReservationCTA />
    </LuxeShell>
  );
}
