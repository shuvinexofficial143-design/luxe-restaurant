import LuxeShell from "@/components/luxe/LuxeShell";
import SocialProofBand from "@/components/reviews/SocialProofBand";
import InstagramMockGrid from "@/components/reviews/InstagramMockGrid";
import SocialShareCard from "@/components/reviews/SocialShareCard";
import RecentReviews from "@/components/reviews/RecentReviews";

export const metadata = { title: "LUXE Social" };

export default function SocialPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Social proof</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">People remember nights.</h1>

          <div className="mt-6">
            <SocialProofBand />
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <div>
              <p className="lx-kicker">Instagram-ready</p>
              <h2 className="lx-serif mt-2 text-4xl">Visual feed.</h2>
              <div className="mt-4">
                <InstagramMockGrid />
              </div>
            </div>

            <div>
              <p className="lx-kicker">Latest voice</p>
              <h2 className="lx-serif mt-2 text-4xl">Recent reviews.</h2>
              <div className="mt-4">
                <RecentReviews />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <SocialShareCard />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
