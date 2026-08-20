export function reservationWhatsAppText(input: {
  guestName: string;
  reference: string;
  date: string;
  time: string;
}) {
  return `Hello ${input.guestName}. Your LUXE reservation ${input.reference} is confirmed for ${input.date} at ${input.time}.`;
}

export function orderReadyWhatsAppText(input: {
  guestName: string;
  orderId: string;
}) {
  return `Hello ${input.guestName}. Your LUXE order ${input.orderId} is ready.`;
}
