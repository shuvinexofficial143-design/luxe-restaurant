export default function AuthNotice() {
  return (
    <div className="rounded-[24px] bg-[#fff4de] p-5">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#8a5a21]">
        Security status
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Foundation, not final security.</h2>
      <p className="mt-3 text-xs leading-6 text-[#75645d]">
        Admin routes are now protected by a demo cookie and auth API flow. The
        cookie can still be forged by a technical user, so production security
        requires database identities, password hashing, MFA, server-side
        sessions, CSRF protection, rate limiting and audit storage.
      </p>
    </div>
  );
}
