"use client";

export default function RecipientDetails({
  recipientName,
  recipientEmail,
  senderName,
  senderEmail,
  onChange,
}: {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  onChange: (patch: {
    recipientName?: string;
    recipientEmail?: string;
    senderName?: string;
    senderEmail?: string;
  }) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {[
        ["Recipient name", "recipientName", "text", recipientName],
        ["Recipient email", "recipientEmail", "email", recipientEmail],
        ["Your name", "senderName", "text", senderName],
        ["Your email", "senderEmail", "email", senderEmail],
      ].map(([label, key, type, value]) => (
        <label key={key} className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
          {label}
          <input
            required
            type={type}
            value={value}
            onChange={(event) => onChange({ [key]: event.target.value })}
            className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
          />
        </label>
      ))}
    </div>
  );
}
