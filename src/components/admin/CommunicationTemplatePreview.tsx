export default function CommunicationTemplatePreview() {
  const templates = [
    [
      "Reservation confirmation",
      "EMAIL + opt-in WHATSAPP",
      "Triggered after database reservation confirmation.",
    ],
    [
      "Order ready",
      "Opt-in WHATSAPP",
      "Triggered when Kitchen KDS moves an order to READY.",
    ],
    [
      "Gift card",
      "EMAIL",
      "Template foundation available for gift delivery integration.",
    ],
  ];

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">
        Automation templates
      </p>
      <div className="mt-4 space-y-2">
        {templates.map(
          ([title, channel, text]) => (
            <div
              key={title}
              className="rounded-[16px] bg-white p-4"
            >
              <p className="lx-serif text-xl">
                {title}
              </p>
              <p className="mt-1 text-[8px] uppercase tracking-[.09em] text-[#7c241e]">
                {channel}
              </p>
              <p className="mt-2 text-[9px] leading-5 text-[#75645d]">
                {text}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
