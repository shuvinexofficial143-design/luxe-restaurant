export type EventCategory =
  | "Chef Collaboration"
  | "Wine Dinner"
  | "Seasonal"
  | "Brunch"
  | "Workshop";

export type EventRecord = {
  slug: string;
  title: string;
  subtitle: string;
  category: EventCategory;
  date: string;
  time: string;
  duration: string;
  image: string;
  description: string;
  highlights: string[];
  price: number;
  capacity: number;
  seatsRemaining: number;
  featured?: boolean;
  soldOut?: boolean;
};

export type EventBooking = {
  id: string;
  eventSlug: string;
  eventTitle: string;
  quantity: number;
  guestName: string;
  email: string;
  phone: string;
  notes: string;
  subtotal: number;
  total: number;
  status: "CONFIRMED" | "WAITLISTED";
  createdAt: string;
};
