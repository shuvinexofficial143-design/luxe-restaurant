export type ReviewCategory = "Dining" | "Service" | "Wine" | "Events" | "Private Dining";

export type Review = {
  id: string;
  name: string;
  city: string;
  rating: 1 | 2 | 3 | 4 | 5;
  category: ReviewCategory;
  title: string;
  text: string;
  visitDate: string;
  verified: boolean;
  featured?: boolean;
  createdAt: string;
};

export type FeedbackRecord = {
  id: string;
  overall: number;
  food: number;
  service: number;
  ambience: number;
  value: number;
  wouldReturn: boolean;
  note: string;
  createdAt: string;
};
