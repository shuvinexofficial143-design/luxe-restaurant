import LuxeShell from "@/components/luxe/LuxeShell";
import CareerHero from "@/components/careers/CareerHero";
import CareersClient from "@/components/careers/CareersClient";
import BenefitsGrid from "@/components/careers/BenefitsGrid";
import HiringSteps from "@/components/careers/HiringSteps";
import { jobs } from "@/lib/careers/data";

export const metadata = { title: "Careers at LUXE" };

export default function CareersPage() {
  return (
    <LuxeShell>
      <CareerHero />

      <section className="px-3 py-8 md:px-5 md:py-12">
        <div className="mx-auto max-w-[1100px]">
          <div>
            <p className="lx-kicker">Why join</p>
            <h2 className="lx-serif mt-2 text-4xl md:text-6xl">
              Build your craft here.
            </h2>
            <div className="mt-5">
              <BenefitsGrid />
            </div>
          </div>

          <div className="mt-10">
            <p className="lx-kicker">Hiring flow</p>
            <h2 className="lx-serif mt-2 text-4xl">What happens next.</h2>
            <div className="mt-5">
              <HiringSteps />
            </div>
          </div>

          <div id="openings" className="mt-12 scroll-mt-[110px]">
            <p className="lx-kicker">Open roles</p>
            <h2 className="lx-serif mt-2 text-4xl md:text-6xl">
              Find your place.
            </h2>
            <div className="mt-5">
              <CareersClient jobs={jobs} />
            </div>
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
