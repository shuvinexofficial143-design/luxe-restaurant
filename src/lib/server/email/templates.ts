function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function shell(title: string, body: string) {
  return `
  <div style="font-family:Arial,sans-serif;background:#efe5da;padding:28px;color:#201713">
    <div style="max-width:620px;margin:auto;background:#fffaf4;border-radius:24px;padding:28px">
      <div style="font-size:12px;letter-spacing:2px;color:#7c241e">LUXE RESTAURANT</div>
      <h1 style="font-size:34px;margin:12px 0 18px">${escapeHtml(
        title
      )}</h1>
      ${body}
      <p style="margin-top:26px;font-size:12px;color:#75645d">This is an operational message related to your LUXE activity.</p>
    </div>
  </div>`;
}

export function reservationConfirmationEmail(input: {
  guestName: string;
  reference: string;
  date: string;
  time: string;
  guests: number;
}) {
  const text = `Hello ${input.guestName}. Your LUXE reservation ${input.reference} is confirmed for ${input.date} at ${input.time} for ${input.guests} guests.`;

  return {
    subject: `LUXE reservation ${input.reference}`,
    text,
    html: shell(
      "Your table is confirmed.",
      `<p>Hello ${escapeHtml(
        input.guestName
      )},</p>
       <p>Reservation <strong>${escapeHtml(
         input.reference
       )}</strong></p>
       <p>${escapeHtml(
         input.date
       )} · ${escapeHtml(
         input.time
       )} · ${input.guests} guests</p>`
    ),
  };
}

export function giftCardEmail(input: {
  recipientName: string;
  senderName: string;
  code: string;
  amount: string;
  message: string;
}) {
  const text = `${input.senderName} sent you a LUXE gift card worth ${input.amount}. Code: ${input.code}. ${input.message}`;

  return {
    subject: "A LUXE gift for you",
    text,
    html: shell(
      "A LUXE gift for you.",
      `<p>Hello ${escapeHtml(
        input.recipientName
      )},</p>
       <p>${escapeHtml(
         input.senderName
       )} sent you a gift card worth <strong>${escapeHtml(
         input.amount
       )}</strong>.</p>
       <p>Code: <strong>${escapeHtml(
         input.code
       )}</strong></p>
       <p>${escapeHtml(
         input.message
       )}</p>`
    ),
  };
}
