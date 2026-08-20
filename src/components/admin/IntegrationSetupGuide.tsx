export default function IntegrationSetupGuide() {
  const steps = [
    ["01", "Razorpay", "Add key ID, key secret and webhook secret to .env.local."],
    ["02", "Resend", "Verify a sending domain, then add RESEND_API_KEY and LUXE_EMAIL_FROM."],
    ["03", "WhatsApp", "Add Meta access token, phone number ID and webhook verify token."],
    ["04", "Restart", "Restart the Next.js process after changing environment variables."],
    ["05", "Webhooks", "Point Razorpay and Meta webhooks at the deployed HTTPS routes."],
    ["06", "Go live carefully", "Use test/sandbox credentials before enabling real customer flows."],
  ];

  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
      {steps.map(([number, title, text]) => (
        <div key={number} className="rounded-[20px] bg-[#fffaf4] p-4">
          <p className="text-[9px] text-[#7c241e]">{number}</p>
          <p className="lx-serif mt-2 text-2xl">{title}</p>
          <p className="mt-2 text-[10px] leading-5 text-[#75645d]">{text}</p>
        </div>
      ))}
    </div>
  );
}
