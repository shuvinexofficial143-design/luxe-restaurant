export type CustomerProfileRow = {
  customer_id: string;
  favourite_area: string | null;
  dietary_preferences: string[];
  favourite_cuisines: string[];
  marketing_opt_in: boolean;
  notes: string | null;
  updated_at?: string;
};

export type CustomerOccasionRow = {
  id: string;
  customer_id: string;
  label: string;
  occasion_date: string;
  note: string | null;
  created_at?: string;
};

export type SavedDishRow = {
  id: string;
  customer_id: string;
  dish_slug: string;
  dish_title: string;
  image_url: string | null;
  created_at?: string;
};

export type LoyaltyWalletRow = {
  customer_id: string;
  points_balance: number;
  lifetime_points: number;
  tier: "EMBER" | "GOLD" | "NOIR";
  updated_at?: string;
};

export type LoyaltyTransactionRow = {
  id: string;
  customer_id: string;
  transaction_type: "EARN" | "REDEEM" | "ADJUST";
  points: number;
  source: string;
  reference_id: string | null;
  description: string;
  created_at?: string;
};

export type AccountDashboardPayload = {
  profile: CustomerProfileRow;
  occasions: CustomerOccasionRow[];
  savedDishes: SavedDishRow[];
  loyalty: LoyaltyWalletRow;
  loyaltyHistory: LoyaltyTransactionRow[];
};
