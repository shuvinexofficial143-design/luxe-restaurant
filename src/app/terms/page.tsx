import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";

const sections = [
  ["Reservations", "Reservation availability, deposits, confirmation rules and cancellation terms should match the production booking provider and restaurant policy."],
  ["Gift cards", "Gift-card values, validity, refunds and transferability shown in this demo must be replaced with real commercial terms before payments are enabled."],
  ["Website content", "Menus, prices, opening hours, awards and availability may change. Production content should be kept current and verified by the restaurant team."],
  ["Liability", "Add jurisdiction-appropriate terms covering website use, third-party services, availability and limitations of liability before a real commercial launch."],
];

export const metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Using this website"
        title="Terms"
        text="A production-ready place for reservation, gift-card and website terms once the demo becomes a live commercial restaurant site."
        image="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#f5ead5] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <p className="lx-kicker">Important</p>
          <p className="lx-serif mt-6 text-3xl leading-[1.35] text-[#3b241d]">
            These are placeholder portfolio terms. They should be reviewed and replaced with real legal terms before launch.
          </p>

          <div className="mt-12 divide-y divide-[#5b3429]/16 border-y border-[#5b3429]/16">
            {sections.map(([title, text], index) => (
              <section key={title} className="grid gap-5 py-8 md:grid-cols-[90px_1fr]">
                <p className="text-[9px] uppercase tracking-[.24em] text-[#8d3a25]">0{index + 1}</p>
                <div>
                  <h2 className="lx-serif text-3xl">{title}</h2>
                  <p className="mt-4 text-sm leading-7 text-[#625048]">{text}</p>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
