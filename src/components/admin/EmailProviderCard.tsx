export default function EmailProviderCard() {
  return (
    <div className="rounded-[26px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc99a]">
        Resend
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Transactional email.</h2>
      <div className="mt-5 space-y-2 text-[10px] leading-5 text-white/55">
        <p>✓ Server-side Resend REST adapter</p>
        <p>✓ Reservation confirmation template</p>
        <p>✓ Gift-card email template</p>
        <p>✓ No automatic test email</p>
        <p>… Production domain/from-address verification required</p>
      </div>
    </div>
  );
}
