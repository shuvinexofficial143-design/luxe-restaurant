export function giftServiceFee(amount: number) {
  return Math.round(Math.max(0, amount) * 0.02);
}

export function giftTotal(amount: number) {
  return Math.max(0, amount) + giftServiceFee(amount);
}
