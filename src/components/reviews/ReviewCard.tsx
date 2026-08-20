import type { Review } from "@/lib/reviews/types";
import RatingStars from "./RatingStars";
import ReviewBadge from "./ReviewBadge";

export default function ReviewCard({
  review,
}: {
  review: Review;
}) {
  return (
    <article className="rounded-[24px] border border-[#4a3025]/10 bg-[#fffaf4] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <RatingStars value={review.rating} size="sm" />
          <p className="lx-serif mt-3 text-2xl">{review.title}</p>
        </div>
        <ReviewBadge verified={review.verified} />
      </div>

      <p className="mt-3 text-sm leading-7 text-[#66534b]">{review.text}</p>

      <div className="mt-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium">{review.name}</p>
          <p className="mt-1 text-[9px] text-[#8a756b]">
            {review.city} · {review.category}
          </p>
        </div>
        <p className="text-[9px] text-[#8a756b]">{review.visitDate}</p>
      </div>
    </article>
  );
}
