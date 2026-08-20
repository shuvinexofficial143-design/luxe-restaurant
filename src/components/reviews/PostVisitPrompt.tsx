import Link from "next/link";

export default function PostVisitPrompt() {
  return (
    <div className="rounded-[26px] bg-[#fff4de] p-5">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#8a5a21]">
        After your visit
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Two minutes of feedback.</h2>
      <p className="mt-3 text-xs leading-6 text-[#75645d]">
        Score food, service, ambience and value, then tell us whether you would return.
      </p>
      <Link
        href="/feedback"
        className="mt-5 inline-flex rounded-full bg-[#201713] px-4 py-3 text-[9px] uppercase tracking-[.12em] text-white"
      >
        Give feedback ↗
      </Link>
    </div>
  );
}
