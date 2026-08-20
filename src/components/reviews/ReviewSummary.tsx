"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import type { ReviewCategory } from "@/lib/reviews/types";
import { reviewStore } from "@/lib/reviews/storage";
import ReviewFilters from "./ReviewFilters";
import ReviewGrid from "./ReviewGrid";
import ReviewStats from "./ReviewStats";

export default function ReviewSummary() {
  const reviews = useSyncExternalStore(
    reviewStore.subscribe,
    reviewStore.getSnapshot,
    reviewStore.getServerSnapshot
  );
  const [category, setCategory] = useState<"All" | ReviewCategory>("All");
  const [rating, setRating] = useState(0);

  const visible = useMemo(
    () =>
      reviews.filter((review) => {
        if (category !== "All" && review.category !== category) return false;
        if (rating > 0 && review.rating !== rating) return false;
        return true;
      }),
    [category, rating, reviews]
  );

  return (
    <div>
      <ReviewStats reviews={reviews} />

      <div className="mt-4 sticky top-[80px] z-30 md:top-[92px]">
        <ReviewFilters
          category={category}
          rating={rating}
          onCategory={setCategory}
          onRating={setRating}
        />
      </div>

      <div className="mt-4">
        {visible.length ? (
          <ReviewGrid reviews={visible} />
        ) : (
          <div className="rounded-[24px] bg-[#fffaf4] p-8 text-center">
            <p className="lx-serif text-3xl">No reviews match.</p>
          </div>
        )}
      </div>
    </div>
  );
}
