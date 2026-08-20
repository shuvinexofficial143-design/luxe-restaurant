import type { Review } from "@/lib/reviews/types";
import ReviewCard from "./ReviewCard";

export default function TestimonialsRail({
  reviews,
}: {
  reviews: Review[];
}) {
  return (
    <div className="-mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 md:mx-0 md:px-0">
      {reviews.map((review) => (
        <div key={review.id} className="w-[84vw] max-w-[420px] shrink-0 snap-center">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
}
