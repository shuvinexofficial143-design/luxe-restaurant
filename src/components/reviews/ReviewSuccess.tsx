import Link from "next/link";

export default function ReviewSuccess({
  id,
}: {
  id: string;
}) {
  return (
    <div className="overflow-hidden rounded-[30px] bg-[#fffaf4]">
      <div className="bg-[#335f50] p-7 text-white">
        <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
          Review saved
        </p>
        <h1 className="lx-serif mt-2 text-5xl">Thank you.</h1>
        <p className="mt-3 text-sm text-white/55">Reference · {id || "Local demo"}</p>
      </div>

      <div className="p-6">
        <p className="text-sm leading-7 text-[#66534b]">
          Your review is saved locally in this browser and will appear in the reviews feed.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link href="/reviews" className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white">
            View reviews
          </Link>
          <Link href="/feedback" className="flex min-h-12 items-center justify-center rounded-[16px] border border-[#4a3025]/10 text-[9px] uppercase tracking-[.12em]">
            More feedback
          </Link>
        </div>
      </div>
    </div>
  );
}
