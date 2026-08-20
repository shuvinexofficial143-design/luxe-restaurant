export function createServerId(prefix: string) {
  const time = Date.now().toString(36).toUpperCase();
  const random = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `${prefix}-${time}-${random}`;
}

export const serverIds = {
  user: () => createServerId("USR"),
  reservation: () => createServerId("RSV"),
  order: () => createServerId("ORD"),
  eventBooking: () => createServerId("EVT"),
  privateDining: () => createServerId("PD"),
  gift: () => createServerId("GFT"),
  cms: () => createServerId("CMS"),
  audit: () => createServerId("AUD"),
};
