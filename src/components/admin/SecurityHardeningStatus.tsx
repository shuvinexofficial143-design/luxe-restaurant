export default function SecurityHardeningStatus() {
  const items = [
    ["Admin identity", "Database user + scrypt password"],
    ["Session", "32-byte opaque token, hash stored in DB"],
    ["Cookie", "HttpOnly · Secure in production · SameSite Strict"],
    ["RBAC", "Server-side permission check per protected API"],
    ["CSRF", "Double-submit token for admin write actions"],
    ["Rate limit", "PostgreSQL shared rate-limit RPC"],
    ["Audit", "Persistent security event log"],
    ["Headers", "HSTS production + nosniff + frame/referrer policies"],
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {items.map(([title, text]) => (
        <div
          key={title}
          className="rounded-[18px] bg-[#fffaf4] p-4"
        >
          <p className="lx-serif text-xl">{title}</p>
          <p className="mt-2 text-[9px] leading-5 text-[#75645d]">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}
