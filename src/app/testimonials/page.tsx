import LuxeShell from "@/components/luxe/LuxeShell";
import TestimonialsRail from "@/components/reviews/TestimonialsRail";
import SocialProofBand from "@/components/reviews/SocialProofBand";
import { featuredReviews } from "@/lib/reviews/stats";
import { seedReviews } from "@/lib/reviews/data";

export const metadata = { title: "Testimonials" };

export default function TestimonialsPage() {
  const reviews = featuredReviews(seedReviews);

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <p className="lx-kicker">Selected guest notes</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Testimonials.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Demo testimonials showing how guest stories can be presented in a premium mobile-first rail.
          </p>

          <div className="mt-6">
            <SocialProofBand />
          </div>

          <div className="mt-6">
            <TestimonialsRail reviews={reviews} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
