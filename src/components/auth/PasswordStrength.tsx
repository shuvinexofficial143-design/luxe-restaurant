"use client";

export default function PasswordStrength({
  password,
}: {
  password: string;
}) {
  const checks = [
    ["12+ characters", password.length >= 12],
    ["Uppercase", /[A-Z]/.test(password)],
    ["Lowercase", /[a-z]/.test(password)],
    ["Number", /[0-9]/.test(password)],
    ["Symbol", /[^A-Za-z0-9]/.test(password)],
  ] as const;

  const passed = checks.filter(([, ok]) => ok).length;

  return (
    <div className="rounded-[16px] bg-[#f3e7dc] p-3">
      <div className="flex gap-1">
        {checks.map(([label, ok]) => (
          <span
            key={label}
            className={`h-1.5 flex-1 rounded-full ${
              ok ? "bg-[#335f50]" : "bg-[#d8c9bd]"
            }`}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {checks.map(([label, ok]) => (
          <span
            key={label}
            className={`text-[8px] ${
              ok ? "text-[#335f50]" : "text-[#8a756b]"
            }`}
          >
            {ok ? "✓" : "○"} {label}
          </span>
        ))}
      </div>

      <p className="mt-2 text-[8px] uppercase tracking-[.09em] text-[#75645d]">
        Strength {passed}/5
      </p>
    </div>
  );
}
