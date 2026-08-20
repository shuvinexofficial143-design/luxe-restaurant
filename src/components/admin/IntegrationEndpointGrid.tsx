const endpoints = [
  ["GET", "/api/v1/integrations/health", "Configuration-only health check"],
  ["POST", "/api/v1/payments/create-order", "Create real Razorpay order"],
  ["POST", "/api/v1/payments/verify", "Verify checkout signature"],
  ["POST", "/api/v1/webhooks/razorpay", "Verify Razorpay webhook"],
  ["POST", "/api/v1/email/reservation-confirmation", "Send reservation email"],
  ["POST", "/api/v1/email/gift-card", "Send gift-card email"],
  ["POST", "/api/v1/whatsapp/send", "Send WhatsApp text"],
  ["POST", "/api/v1/whatsapp/template", "Send approved WhatsApp template"],
  ["GET/POST", "/api/v1/webhooks/whatsapp", "Meta webhook endpoint"],
];

export default function IntegrationEndpointGrid() {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {endpoints.map(([method, path, text]) => (
        <div key={path} className="rounded-[18px] bg-[#fffaf4] p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="break-all text-xs font-medium">{path}</p>
            <span className="rounded-full bg-[#335f50]/10 px-2 py-1 text-[7px] uppercase tracking-[.08em] text-[#335f50]">
              {method}
            </span>
          </div>
          <p className="mt-2 text-[9px] leading-5 text-[#75645d]">{text}</p>
        </div>
      ))}
    </div>
  );
}
