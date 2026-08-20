import type { Review } from "@/lib/reviews/types";
import { averageRating, ratingBreakdown } from "@/lib/reviews/stats";
import RatingStars from "./RatingStars";

export default function ReviewStats({
  reviews,
}: {
  reviews: Review[];
}) {
  const average = averageRating(reviews);
  const breakdown = ratingBreakdown(reviews);

  return (
    <div className="grid gap-3 rounded-[28px] bg-[#201713] p-5 text-white md:grid-cols-[220px_1fr] md:p-7">
      <div>
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
          Guest score
        </p>
        <p className="lx-serif mt-2 text-6xl">{average.toFixed(1)}</p>
        <div className="mt-2">
          <RatingStars value={Math.round(average)} />
        </div>
        <p className="mt-2 text-xs text-white/45">{reviews.length} demo reviews</p>
      </div>

      <div className="space-y-2">
        {breakdown.map((item) => (
          <div key={item.rating} className="grid grid-cols-[34px_1fr_36px] items-center gap-2">
            <span className="text-xs text-white/55">{item.rating}★</span>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#efc28b]" style={{ width: `${item.percent}%` }} />
            </div>
            <span className="text-right text-[9px] text-white/45">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
