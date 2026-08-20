"use client";

import { useState } from "react";

export default function PasswordField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="grid gap-2 text-[8px] uppercase tracking-[.11em] text-[#7c241e]">
      Password
      <div className="grid grid-cols-[1fr_auto] overflow-hidden rounded-[16px] border border-[#4a3025]/10 bg-white">
        <input
          required
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 min-w-0 bg-transparent px-4 text-sm normal-case tracking-normal outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          className="px-4 text-[8px] uppercase tracking-[.1em] text-[#7c241e]"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>
    </label>
  );
}
