import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";

const sections = [
  ["Information we collect", "This portfolio demo does not store submitted reservation, contact, newsletter or gift-card information. In a production launch, this section should describe the exact information collected by connected services."],
  ["How information is used", "Production data should only be used for booking management, guest communication, service improvement and other purposes clearly disclosed to the guest."],
  ["Third-party services", "If reservation, analytics, email, payment or map providers are connected, list them here with links to their privacy policies."],
  ["Retention and deletion", "Define how long guest information is retained and provide a clear process for deletion or access requests where required by law."],
];

export const metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Guest information"
        title="Privacy"
        text="A transparent place for explaining how guest information is handled once real booking, email and analytics services are connected."
        image="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="bg-[#fff8ed] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5">
          <p className="lx-kicker">Portfolio demo notice</p>
          <p className="lx-serif mt-6 text-3xl leading-[1.35] text-[#3b241d]">
            This page is a design-ready privacy template, not legal advice and not a claim that production services are currently active.
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
