"use client";

import { useSyncExternalStore } from "react";
import { reviewStore } from "@/lib/reviews/storage";
import ReviewGrid from "./ReviewGrid";

export default function RecentReviews() {
  const reviews = useSyncExternalStore(
    reviewStore.subscribe,
    reviewStore.getSnapshot,
    reviewStore.getServerSnapshot
  );

  return <ReviewGrid reviews={reviews.slice(0, 4)} />;
}
