import type { Reward } from "./types";

export const rewards: Reward[] = [
  {
    id: "reward-dessert",
    title: "Signature Dessert",
    description: "Redeem one dessert from the seasonal menu.",
    points: 450,
    category: "Dining",
  },
  {
    id: "reward-welcome-drink",
    title: "Welcome Pairing",
    description: "A sommelier-selected welcome pour or zero-proof pairing.",
    points: 650,
    category: "Wine",
  },
  {
    id: "reward-priority-window",
    title: "Priority Window Table",
    description: "Priority request for a premium window table.",
    points: 900,
    category: "Experience",
  },
  {
    id: "reward-tasting-upgrade",
    title: "Tasting Upgrade",
    description: "Upgrade a standard dinner booking toward the tasting experience.",
    points: 1400,
    category: "Experience",
  },
  {
    id: "reward-gift-credit",
    title: "₹1,000 Gift Credit",
    description: "Demo gift-card credit for a future visit.",
    points: 1800,
    category: "Gift",
  },
  {
    id: "reward-chef-table",
    title: "Chef Table Priority",
    description: "Priority request access for two Chef Table seats.",
    points: 2500,
    category: "Experience",
  },
];

export const membershipBenefits = {
  EMBER: [
    "Earn 1 point per ₹10 demo spend",
    "Save favourite dishes",
    "Store dining preferences",
    "Birthday recognition",
  ],
  GOLD: [
    "Everything in EMBER",
    "Priority waitlist",
    "Early event access",
    "Complimentary welcome pairing",
  ],
  NOIR: [
    "Everything in GOLD",
    "Chef Table priority",
    "Dedicated concierge-ready profile",
    "Private dining preview access",
  ],
} as const;
