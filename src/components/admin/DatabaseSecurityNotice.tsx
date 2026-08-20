export default function DatabaseSecurityNotice() {
  return (
    <div className="rounded-[24px] bg-[#7c241e] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#ffd0aa]">
        Service-role security
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Keep the key server-only.</h2>
      <p className="mt-3 text-xs leading-6 text-white/60">
        SUPABASE_SERVICE_ROLE_KEY bypasses Row Level Security. Never prefix it
        with NEXT_PUBLIC_, never send it to the browser, and never commit your
        real .env.local file to GitHub.
      </p>
    </div>
  );
}
