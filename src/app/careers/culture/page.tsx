import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import CultureGrid from "@/components/careers/CultureGrid";
import TeamValues from "@/components/careers/TeamValues";
import BenefitsGrid from "@/components/careers/BenefitsGrid";

export const metadata = { title: "Life at LUXE" };

export default function CareerCulturePage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1050px]">
          <p className="lx-kicker">Life at LUXE</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Craft is a team sport.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            A restaurant grows when people teach, communicate and repeat good standards together.
          </p>

          <div className="mt-7">
            <TeamValues />
          </div>

          <div className="mt-8">
            <p className="lx-kicker">Culture</p>
            <h2 className="lx-serif mt-2 text-4xl">What we value.</h2>
            <div className="mt-5">
              <CultureGrid />
            </div>
          </div>

          <div className="mt-8">
            <p className="lx-kicker">Benefits</p>
            <h2 className="lx-serif mt-2 text-4xl">Grow with the room.</h2>
            <div className="mt-5">
              <BenefitsGrid />
            </div>
          </div>

          <Link
            href="/careers#openings"
            className="mt-8 inline-flex rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.12em] text-white"
          >
            View open roles ↗
          </Link>
        </div>
      </section>
    </LuxeShell>
  );
}
