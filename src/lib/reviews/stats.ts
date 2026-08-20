import type { Review } from "./types";

export function averageRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

export function ratingBreakdown(reviews: Review[]) {
  return [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((review) => review.rating === rating).length;
    return {
      rating,
      count,
      percent: reviews.length ? Math.round((count / reviews.length) * 100) : 0,
    };
  });
}

export function featuredReviews(reviews: Review[]) {
  return reviews.filter((review) => review.featured || review.rating === 5).slice(0, 6);
}
