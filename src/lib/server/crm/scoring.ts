export function calculateVipScore(input: {
  totalOrders: number;
  totalReservations: number;
  lifetimeValue: number;
  loyaltyPoints: number;
  lastActivityAt: string | null;
}) {
  const orderScore = Math.min(25, input.totalOrders * 3);
  const reservationScore = Math.min(25, input.totalReservations * 4);
  const valueScore = Math.min(
    30,
    Math.floor(input.lifetimeValue / 2500)
  );
  const loyaltyScore = Math.min(
    15,
    Math.floor(input.loyaltyPoints / 500)
  );

  let recencyScore = 0;

  if (input.lastActivityAt) {
    const days = Math.floor(
      (Date.now() - new Date(input.lastActivityAt).getTime()) /
        86_400_000
    );

    recencyScore =
      days <= 14 ? 5 : days <= 30 ? 3 : days <= 60 ? 1 : 0;
  }

  return Math.max(
    0,
    Math.min(
      100,
      orderScore +
        reservationScore +
        valueScore +
        loyaltyScore +
        recencyScore
    )
  );
}
