export default function WhatsAppProviderCard() {
  return (
    <div className="rounded-[26px] bg-[#7c241e] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
        WhatsApp Cloud API
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Guest messaging.</h2>
      <div className="mt-5 space-y-2 text-[10px] leading-5 text-white/60">
        <p>✓ Server-side text messaging adapter</p>
        <p>✓ Template-message foundation</p>
        <p>✓ Meta webhook verification route</p>
        <p>✓ Incoming webhook receiver</p>
        <p>… Approved templates/business number required</p>
        <p>… Incoming automation persistence is next</p>
      </div>
    </div>
  );
}
