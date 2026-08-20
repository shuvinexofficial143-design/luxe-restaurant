import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";

const features = [
  ["Step-free arrival", "The demo venue assumes a step-free main entrance and dining-room route."],
  ["Accessible seating", "Tables can be arranged to allow additional space for mobility devices."],
  ["Dietary communication", "Reservation forms include space for allergies and dietary requirements."],
  ["Reduced motion", "The website respects the browser's prefers-reduced-motion setting for animated elements."],
  ["Keyboard access", "Interactive controls are designed to remain usable with keyboard navigation."],
  ["Readable contrast", "Primary text and controls use high-contrast combinations across light and dark sections."],
];

export const metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Everyone at the table"
        title="Accessibility"
        text="A restaurant experience should be comfortable before the first course arrives — online, at the entrance and throughout the dining room."
        image="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#fff8ed] py-24 md:py-32">
        <div className="lx-container grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="lx-kicker">Accessibility approach</p>
            <h2 className="lx-serif mt-5 text-5xl leading-[.95] md:text-7xl">Make the experience easier to enter.</h2>
            <p className="mt-7 max-w-xl text-sm leading-7 text-[#5e4c44]">
              Venue-specific claims on this demo page must be verified before a real launch.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map(([title, text], index) => (
              <article key={title} className="min-h-[260px] border border-[#5b3429]/14 bg-[#f5ead5] p-7">
                <p className="text-[9px] uppercase tracking-[.24em] text-[#8d3a25]">0{index + 1}</p>
                <h3 className="lx-serif mt-6 text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#625048]">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
