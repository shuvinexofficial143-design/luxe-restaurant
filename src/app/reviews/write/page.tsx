import LuxeShell from "@/components/luxe/LuxeShell";
import ReviewForm from "@/components/reviews/ReviewForm";

export const metadata = { title: "Write a Review" };

export default function WriteReviewPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[760px]">
          <p className="lx-kicker">Guest review</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">Tell us about it.</h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Add a rating, category, title and review. This portfolio demo stores it in your browser.
          </p>

          <div className="mt-6">
            <ReviewForm />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
