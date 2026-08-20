import { notFound } from "next/navigation";
import LuxeShell from "@/components/luxe/LuxeShell";
import JobDetailHero from "@/components/careers/JobDetailHero";
import JobRequirements from "@/components/careers/JobRequirements";
import JobBenefits from "@/components/careers/JobBenefits";
import { getJob, jobs } from "@/lib/careers/data";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  return { title: job ? `${job.title} — Careers` : "Careers" };
}

export default async function JobDetailPage({
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
          <JobDetailHero job={job} />

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_340px]">
            <JobRequirements job={job} />
            <JobBenefits job={job} />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
