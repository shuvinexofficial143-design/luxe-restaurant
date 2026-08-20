export function createGiftId() {
  return `GFT-${Date.now().toString(36).toUpperCase().slice(-7)}`;
}

export function createGiftCode() {
  const left = Math.random().toString(36).slice(2, 6).toUpperCase();
  const right = Date.now().toString(36).slice(-4).toUpperCase();
  return `LUXE-${left}-${right}`;
}

export function formatGiftMoney(value: number) {
  return `₹${Math.max(0, value).toLocaleString("en-IN")}`;
}

export function todayIso() {
  return new Date().toISOString().slice(0, 10);
}
