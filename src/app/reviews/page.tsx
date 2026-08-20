import Link from "next/link";
import LuxeShell from "@/components/luxe/LuxeShell";
import PageHero from "@/components/luxe/PageHero";
import ReviewSummary from "@/components/reviews/ReviewSummary";
import SocialProofBand from "@/components/reviews/SocialProofBand";
import SocialShareCard from "@/components/reviews/SocialShareCard";
import PostVisitPrompt from "@/components/reviews/PostVisitPrompt";

export const metadata = { title: "Guest Reviews" };

export default function ReviewsPage() {
  return (
    <LuxeShell>
      <PageHero
        eyebrow="Guest voice"
        title="Reviews"
        text="Browse ratings by dining, service, wine, events and private dining — then add your own local demo review."
        image="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2200&q=90"
      />

      <section className="px-3 py-6 md:px-5 md:py-10">
        <div className="mx-auto max-w-[1080px]">
          <SocialProofBand />

          <div className="mt-4 flex gap-2">
            <Link
              href="/reviews/write"
              className="rounded-full bg-[#7c241e] px-4 py-3 text-[9px] uppercase tracking-[.12em] text-white"
            >
              Write a review
            </Link>
            <Link
              href="/feedback"
              className="rounded-full border border-[#4a3025]/10 bg-white/70 px-4 py-3 text-[9px] uppercase tracking-[.12em]"
            >
              Private feedback
            </Link>
          </div>

          <div className="mt-6">
            <ReviewSummary />
          </div>

          <div className="mt-8">
            <SocialShareCard />
          </div>

          <div className="mt-4">
            <PostVisitPrompt />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
