"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { JobOpening } from "@/lib/careers/types";
import { careerApplicationStorage } from "@/lib/careers/storage";
import { createApplicationId } from "@/lib/careers/utils";
import ResumeUpload from "./ResumeUpload";
import ApplicationSummary from "./ApplicationSummary";

export default function ApplicationForm({
  job,
}: {
  job: JobOpening;
}) {
  const router = useRouter();
  const [resumeName, setResumeName] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = createApplicationId();

    careerApplicationStorage.save({
      id,
      jobSlug: job.slug,
      jobTitle: job.title,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      city: String(form.get("city") || ""),
      experience: String(form.get("experience") || ""),
      portfolioUrl: String(form.get("portfolioUrl") || ""),
      message: String(form.get("message") || ""),
      resumeName,
      status: "RECEIVED",
      createdAt: new Date().toISOString(),
    });

    router.push(`/careers/application/${id}`);
  }

  return (
    <form onSubmit={submit} className="grid gap-4 lg:grid-cols-[1fr_340px]">
      <div className="space-y-4">
        <div className="rounded-[26px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">Your details</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Name", "name", "text"],
              ["Email", "email", "email"],
              ["Phone", "phone", "tel"],
              ["City", "city", "text"],
              ["Experience", "experience", "text"],
              ["Portfolio / LinkedIn", "portfolioUrl", "url"],
            ].map(([label, name, type]) => (
              <label
                key={name}
                className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]"
              >
                {label}
                <input
                  required={name !== "portfolioUrl"}
                  name={name}
                  type={type}
                  className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
                />
              </label>
            ))}
          </div>

          <label className="mt-3 grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
            Why LUXE?
            <textarea
              required
              name="message"
              rows={5}
              minLength={30}
              placeholder="Tell us about your experience and what you want to learn..."
              className="rounded-[18px] border border-[#4a3025]/10 bg-white p-4 text-sm normal-case tracking-normal"
            />
          </label>
        </div>

        <ResumeUpload fileName={resumeName} onChange={setResumeName} />

        <button className="h-14 w-full rounded-[18px] bg-[#7c241e] text-[10px] uppercase tracking-[.14em] text-white">
          Submit demo application ↗
        </button>
      </div>

      <div className="lg:sticky lg:top-[110px] lg:self-start">
        <ApplicationSummary job={job} resumeName={resumeName} />
      </div>
    </form>
  );
}
