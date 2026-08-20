"use client";

export default function GiftMessageEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
      Personal message · {value.length}/180
      <textarea
        rows={4}
        maxLength={180}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="A table, a toast, and a night to remember..."
        className="rounded-[18px] border border-[#4a3025]/10 bg-white p-4 text-sm normal-case tracking-normal"
      />
    </label>
  );
}
