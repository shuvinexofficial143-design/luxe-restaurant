import { seedReviews } from "./data";
import type { FeedbackRecord, Review } from "./types";

const REVIEW_KEY = "luxe-reviews-v1";
const FEEDBACK_KEY = "luxe-feedback-v1";
const listeners = new Set<() => void>();
let cache: Review[] | null = null;

function readReviews(): Review[] {
  if (typeof window === "undefined") return seedReviews;
  if (cache !== null) return cache;

  try {
    const local = JSON.parse(window.localStorage.getItem(REVIEW_KEY) || "[]");
    const userReviews = Array.isArray(local) ? local : [];
    cache = [...userReviews, ...seedReviews];
  } catch {
    cache = seedReviews;
  }

  return cache;
}

function writeUserReview(review: Review) {
  if (typeof window === "undefined") return;
  let current: Review[] = [];

  try {
    const parsed = JSON.parse(window.localStorage.getItem(REVIEW_KEY) || "[]");
    current = Array.isArray(parsed) ? parsed : [];
  } catch {
    current = [];
  }

  window.localStorage.setItem(REVIEW_KEY, JSON.stringify([review, ...current]));
  cache = null;
  listeners.forEach((listener) => listener());
}

export const reviewStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot() {
    return readReviews();
  },
  getServerSnapshot() {
    return seedReviews;
  },
  add(review: Review) {
    writeUserReview(review);
  },
};

export const feedbackStore = {
  save(record: FeedbackRecord) {
    if (typeof window === "undefined") return;
    let current: FeedbackRecord[] = [];

    try {
      const parsed = JSON.parse(window.localStorage.getItem(FEEDBACK_KEY) || "[]");
      current = Array.isArray(parsed) ? parsed : [];
    } catch {
      current = [];
    }

    window.localStorage.setItem(FEEDBACK_KEY, JSON.stringify([record, ...current]));
  },
};
