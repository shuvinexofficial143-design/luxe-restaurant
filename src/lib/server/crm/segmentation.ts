import type { CRMSegment } from "./types";

export function resolveSegment(input: {
  vipScore: number;
  totalOrders: number;
  totalReservations: number;
  lastActivityAt: string | null;
}): CRMSegment {
  const activityCount = input.totalOrders + input.totalReservations;

  if (!activityCount) return "NEW";

  const lastActivity = input.lastActivityAt
    ? new Date(input.lastActivityAt).getTime()
    : 0;

  const daysSinceActivity = lastActivity
    ? Math.floor((Date.now() - lastActivity) / 86_400_000)
    : 9999;

  if (daysSinceActivity >= 180) return "DORMANT";
  if (daysSinceActivity >= 75) return "AT_RISK";
  if (input.vipScore >= 80) return "VIP";
  if (activityCount >= 8 || input.vipScore >= 55) return "LOYAL";
  if (activityCount >= 3) return "REGULAR";
  return "NEW";
}
