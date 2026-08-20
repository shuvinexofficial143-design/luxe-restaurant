"use client";

export default function PreferenceToggle({
  title,
  text,
  checked,
  onChange,
}: {
  title: string;
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`rounded-[20px] border p-4 text-left ${
        checked
          ? "border-[#335f50] bg-[#335f50] text-white"
          : "border-[#4a3025]/10 bg-[#fffaf4]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="lx-serif text-2xl">{title}</p>
          <p className="mt-2 text-xs leading-6 opacity-60">{text}</p>
        </div>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs ${
            checked ? "border-white/30 bg-white/10" : "border-[#4a3025]/10"
          }`}
        >
          {checked ? "✓" : ""}
        </span>
      </div>
    </button>
  );
}
