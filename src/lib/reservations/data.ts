import type { DiningArea, TableOption } from "./types";

export const diningAreas: {
  name: DiningArea;
  description: string;
  tag: string;
}[] = [
  { name: "Main Dining", description: "Warm central room with full view of the service floor.", tag: "Most flexible" },
  { name: "Window", description: "Quieter edge tables with natural light and street views.", tag: "Popular" },
  { name: "Terrace", description: "Open-air evening seating, weather permitting.", tag: "Outdoor" },
  { name: "Chef Table", description: "Kitchen-side counter experience with direct chef interaction.", tag: "Premium" },
];

export const tables: TableOption[] = [
  { id: "M1", label: "M1", area: "Main Dining", seats: 2, note: "Intimate two-top" },
  { id: "M2", label: "M2", area: "Main Dining", seats: 4, note: "Central dining room" },
  { id: "M3", label: "M3", area: "Main Dining", seats: 4, note: "Near wine display" },
  { id: "M4", label: "M4", area: "Main Dining", seats: 6, note: "Good for families" },
  { id: "W1", label: "W1", area: "Window", seats: 2, premium: true, note: "Best window view" },
  { id: "W2", label: "W2", area: "Window", seats: 4, premium: true, note: "Corner window" },
  { id: "T1", label: "T1", area: "Terrace", seats: 2, note: "Open-air table" },
  { id: "T2", label: "T2", area: "Terrace", seats: 4, note: "Terrace garden edge" },
  { id: "T3", label: "T3", area: "Terrace", seats: 6, note: "Group terrace table" },
  { id: "C1", label: "C1", area: "Chef Table", seats: 2, premium: true, note: "Kitchen counter pair" },
  { id: "C2", label: "C2", area: "Chef Table", seats: 4, premium: true, note: "Chef interaction seats" },
];

export const occasions = [
  "Just dining",
  "Birthday",
  "Anniversary",
  "Date night",
  "Business dinner",
  "Proposal",
  "Family celebration",
];

export const baseTimes = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];
