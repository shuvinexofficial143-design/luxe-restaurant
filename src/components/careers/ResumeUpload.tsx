"use client";

export default function ResumeUpload({
  fileName,
  onChange,
}: {
  fileName: string;
  onChange: (fileName: string) => void;
}) {
  return (
    <label className="block rounded-[20px] border border-dashed border-[#7c241e]/25 bg-[#fffaf4] p-5 text-center">
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          onChange(file?.name || "");
        }}
      />

      <p className="text-3xl">↥</p>
      <p className="lx-serif mt-2 text-2xl">
        {fileName || "Upload your CV"}
      </p>
      <p className="mt-2 text-[10px] leading-5 text-[#75645d]">
        PDF, DOC or DOCX. Demo mode stores only the file name, not the file itself.
      </p>

      <span className="mt-4 inline-flex rounded-full bg-[#201713] px-4 py-3 text-[8px] uppercase tracking-[.11em] text-white">
        Choose file
      </span>
    </label>
  );
}
