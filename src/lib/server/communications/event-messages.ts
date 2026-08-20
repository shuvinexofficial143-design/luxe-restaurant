export function reservationNotificationPayload(input: {
  guestName: string;
  reference: string;
  date: string;
  time: string;
  guests: number;
}) {
  return {
    guestName: input.guestName,
    reference: input.reference,
    date: input.date,
    time: input.time,
    guests: input.guests,
  };
}

export function orderReadyNotificationPayload(input: {
  orderId: string;
  guestName: string;
}) {
  return {
    orderId: input.orderId,
    guestName: input.guestName,
  };
}
