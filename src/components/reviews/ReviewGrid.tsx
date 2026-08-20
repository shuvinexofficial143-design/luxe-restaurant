import type { Review } from "@/lib/reviews/types";
import ReviewCard from "./ReviewCard";

export default function ReviewGrid({
  reviews,
}: {
  reviews: Review[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
}
