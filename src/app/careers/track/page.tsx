"use client";

import { useSearchParams } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import ApplicationTracker from "@/components/careers/ApplicationTracker";

export default function CareerTrackPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[720px]">
          <p className="lx-kicker">Application status</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Track application.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Enter the local application reference created after submitting a demo application.
          </p>

          <div className="mt-6">
            <ApplicationTracker initialId={id} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
