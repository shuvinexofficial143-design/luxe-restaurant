
import Link from "next/link";
import FloatingMenuDeck from "./redesign/FloatingMenuDeck";
import SignatureMenuList from "./redesign/SignatureMenuList";
import LuxurySectionHeading from "./redesign/LuxurySectionHeading";
import ExperienceStrip from "./redesign/ExperienceStrip";
import StoryPanel from "./redesign/StoryPanel";
import WineSpotlight from "./redesign/WineSpotlight";
import ReservationTeaser from "./redesign/ReservationTeaser";
import LuxuryMarquee from "./redesign/LuxuryMarquee";
import GlowDivider from "./redesign/GlowDivider";
import ServicePromise from "./redesign/ServicePromise";
import AtmospherePanel from "./redesign/AtmospherePanel";
import MembershipTeaser from "./redesign/MembershipTeaser";

export default function HomeSections() {
  return (
    <>
      <section id="explore" className="px-3 pt-6 md:px-5 md:pt-10">
        <div className="mx-auto max-w-[1240px]">
          <LuxuryMarquee />
        </div>
      </section>

      <section className="lx-luxury-section">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex items-end justify-between gap-5">
            <LuxurySectionHeading
              eyebrow="Tonight's menu"
              title="A menu that"
              italic="moves."
              text="Inspired by the floating menu presentation you liked: premium dark boards, small food moments and more UI than oversized photography."
            />
            <Link
              href="/menu"
              className="hidden text-[8px] uppercase tracking-[.16em] text-[#c9944b] md:block"
            >
              Full menu ↗
            </Link>
          </div>

          <FloatingMenuDeck />

          <div className="mt-3 md:hidden">
            <Link
              href="/menu"
              className="lx-ghost-button flex min-h-12 items-center justify-center rounded-[15px] text-[8px] uppercase tracking-[.13em]"
            >
              Open full menu
            </Link>
          </div>
        </div>
      </section>

      <section className="lx-luxury-section pt-3">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end">
          <LuxurySectionHeading
            eyebrow="Signature plates"
            title="Built by fire."
            italic="Finished with restraint."
            text="A tighter editorial menu presentation keeps the food important without turning the whole page into a photo gallery."
          />
          <SignatureMenuList />
        </div>
      </section>

      <section className="lx-luxury-section">
        <div className="mx-auto max-w-[1240px]">
          <StoryPanel />
        </div>
      </section>

      <section className="lx-luxury-section">
        <div className="mx-auto max-w-[1240px]">
          <div className="mb-6">
            <LuxurySectionHeading
              eyebrow="Choose your evening"
              title="Dining beyond"
              italic="the table."
            />
          </div>
          <ExperienceStrip />
        </div>
      </section>

      <section className="lx-luxury-section pt-3">
        <div className="mx-auto max-w-[1240px]">
          <WineSpotlight />
        </div>
      </section>

      <section className="lx-luxury-section py-7">
        <div className="mx-auto max-w-[1240px]">
          <GlowDivider label="A night at LUXE" />
          <div className="mt-5">
            <AtmospherePanel />
          </div>
          <div className="mt-4">
            <ServicePromise />
          </div>
        </div>
      </section>

      <section className="lx-luxury-section pt-5">
        <div className="mx-auto grid max-w-[1240px] gap-3 md:grid-cols-[1.25fr_.75fr]">
          <ReservationTeaser />
          <MembershipTeaser />
        </div>
      </section>
    </>
  );
}
