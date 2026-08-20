import LuxeShell from "@/components/luxe/LuxeShell";
import FeedbackForm from "@/components/reviews/FeedbackForm";
import ReviewHighlights from "@/components/reviews/ReviewHighlights";

export const metadata = { title: "Post-Visit Feedback" };

export default function FeedbackPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[920px]">
          <p className="lx-kicker">Private feedback</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">How did we do?</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Score the core parts of your visit without publishing a public review.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_340px]">
            <FeedbackForm />
            <ReviewHighlights />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
