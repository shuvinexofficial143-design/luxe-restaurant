import AuthNotice from "@/components/auth/AuthNotice";

export default function SecurityPanel() {
  const items = [
    ["Route protection", "Demo cookie checked by Next.js proxy", true],
    ["Login API", "Server route validates demo credentials", true],
    ["HTTP-only session cookie", "Cookie is not readable by client JavaScript", true],
    ["Role model", "Six admin roles with permission map", true],
    ["Database users", "Not connected yet", false],
    ["Password hashing", "Not connected yet", false],
    ["MFA / OTP", "Not connected yet", false],
    ["Server session store", "Not connected yet", false],
    ["Rate limiting", "Not connected yet", false],
    ["Persistent audit log", "Not connected yet", false],
  ];

  return (
    <div className="space-y-4">
      <AuthNotice />

      <div className="grid gap-2 md:grid-cols-2">
        {items.map(([title, text, ready]) => (
          <div key={String(title)} className="rounded-[20px] bg-[#fffaf4] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="lx-serif text-2xl">{String(title)}</p>
                <p className="mt-2 text-xs leading-6 text-[#75645d]">
                  {String(text)}
                </p>
              </div>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] ${
                  ready
                    ? "bg-[#335f50] text-white"
                    : "bg-[#fff0d7] text-[#8a5a21]"
                }`}
              >
                {ready ? "✓" : "…"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
