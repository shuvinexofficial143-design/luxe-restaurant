"use client";

export default function CMSImageField({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Image URL
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://..."
          className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case tracking-normal"
        />
      </label>

      {value ? (
        <div
          className="mt-2 h-[150px] rounded-[16px] bg-[#ddd] bg-cover bg-center"
          style={{ backgroundImage: `url("${value}")` }}
        />
      ) : null}
    </div>
  );
}
