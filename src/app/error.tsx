"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative isolate grid min-h-screen place-items-center overflow-hidden bg-[#170c09] px-5 text-center text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(112,35,29,.28),rgba(23,12,9,1)_72%)]" />
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[.34em] text-[#efb36c]">
          Service interrupted
        </p>
        <h1 className="lx-serif mt-6 text-[clamp(4rem,10vw,8rem)] leading-[.85] tracking-[-.055em]">
          Something left the pass too early.
        </h1>
        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/56">
          The page encountered an unexpected problem. Try loading this section again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="lx-button mt-9 bg-[#6b231d]"
        >
          Try again →
        </button>
      </div>
    </main>
  );
}
