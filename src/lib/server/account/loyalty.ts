import type { LoyaltyWalletRow } from "./types";

export function loyaltyTier(lifetimePoints: number): LoyaltyWalletRow["tier"] {
  if (lifetimePoints >= 10000) return "NOIR";
  if (lifetimePoints >= 3500) return "GOLD";
  return "EMBER";
}

export const loyaltyRewards = [
  {
    id: "reward-dessert",
    title: "Chef Dessert",
    points: 650,
    text: "Redeem points for one selected dessert.",
  },
  {
    id: "reward-wine-flight",
    title: "Wine Flight Upgrade",
    points: 1200,
    text: "Upgrade a qualifying tasting experience.",
  },
  {
    id: "reward-private-table",
    title: "Priority Table Request",
    points: 1800,
    text: "Priority request for selected high-demand dates.",
  },
];

export function canRedeem(balance: number, points: number) {
  return points > 0 && balance >= points;
}
