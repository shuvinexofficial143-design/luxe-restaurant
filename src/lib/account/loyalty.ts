import type { MembershipTier } from "./types";

export function tierForPoints(points: number): MembershipTier {
  if (points >= 5000) return "NOIR";
  if (points >= 1800) return "GOLD";
  return "EMBER";
}

export function nextTier(points: number) {
  if (points < 1800) {
    return { name: "GOLD" as MembershipTier, target: 1800, remaining: 1800 - points };
  }

  if (points < 5000) {
    return { name: "NOIR" as MembershipTier, target: 5000, remaining: 5000 - points };
  }

  return { name: "NOIR" as MembershipTier, target: 5000, remaining: 0 };
}

export function tierProgress(points: number) {
  if (points < 1800) return Math.min(100, (points / 1800) * 100);
  if (points < 5000) return Math.min(100, ((points - 1800) / (5000 - 1800)) * 100);
  return 100;
}
