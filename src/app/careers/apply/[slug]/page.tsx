import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import ApplicationForm from "@/components/careers/ApplicationForm";
import { getJob, jobs } from "@/lib/careers/data";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export const metadata = { title: "Apply to LUXE" };

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);

  if (!job) notFound();

  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Apply to LUXE</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">{job.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            Complete the demo application. CV upload stores only the selected filename in this browser.
          </p>

          <div className="mt-6">
            <ApplicationForm job={job} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
