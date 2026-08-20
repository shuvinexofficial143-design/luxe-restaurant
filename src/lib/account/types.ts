export type MembershipTier = "EMBER" | "GOLD" | "NOIR";

export type AccountPreferences = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  lowSpice: boolean;
  noNuts: boolean;
  favouriteArea: "Main Dining" | "Window" | "Terrace" | "Chef Table";
};

export type SpecialOccasion = {
  id: string;
  label: string;
  date: string;
};

export type PointsEntry = {
  id: string;
  label: string;
  points: number;
  date: string;
};

export type AccountProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
  city: string;
  joinedAt: string;
  loggedIn: boolean;
  points: number;
  membership: MembershipTier;
  preferences: AccountPreferences;
  occasions: SpecialOccasion[];
  pointsHistory: PointsEntry[];
};

export type Reward = {
  id: string;
  title: string;
  description: string;
  points: number;
  category: "Dining" | "Wine" | "Experience" | "Gift";
};
