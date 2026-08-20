"use client";

import { FormEvent, useSyncExternalStore } from "react";
import { cmsStore } from "@/lib/cms/storage";

export default function CMSMediaLibrary() {
  useSyncExternalStore(
    cmsStore.subscribe,
    cmsStore.getVersion,
    cmsStore.getServerVersion
  );

  const media = cmsStore.media();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    cmsStore.addMedia(
      String(form.get("name") || ""),
      String(form.get("url") || ""),
      String(form.get("alt") || "")
    );

    event.currentTarget.reset();
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
      <form
        onSubmit={submit}
        className="rounded-[26px] bg-[#fffaf4] p-5 lg:sticky lg:top-[96px] lg:self-start"
      >
        <p className="lx-kicker">Media library</p>
        <h2 className="lx-serif mt-2 text-3xl">Add external media.</h2>

        <div className="mt-4 space-y-3">
          {[
            ["Name", "name", "text"],
            ["Image URL", "url", "url"],
            ["Alt text", "alt", "text"],
          ].map(([label, name, type]) => (
            <label
              key={name}
              className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]"
            >
              {label}
              <input
                required
                name={name}
                type={type}
                className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case tracking-normal"
              />
            </label>
          ))}
        </div>

        <button className="mt-4 h-11 w-full rounded-[14px] bg-[#7c241e] text-[8px] uppercase tracking-[.12em] text-white">
          Add media
        </button>

        <p className="mt-3 text-[9px] leading-5 text-[#8a756b]">
          Demo library stores URLs only. Real upload/storage comes with the backend phase.
        </p>
      </form>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {media.length ? (
          media.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-[20px] bg-[#fffaf4]">
              <div
                className="aspect-square bg-[#ddd] bg-cover bg-center"
                style={{ backgroundImage: `url("${item.url}")` }}
              />
              <div className="p-3">
                <p className="lx-serif text-xl">{item.name}</p>
                <p className="mt-1 line-clamp-2 text-[9px] text-[#75645d]">
                  {item.alt}
                </p>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-2 rounded-[24px] border border-dashed border-[#4a3025]/15 bg-[#fffaf4] p-8 text-center md:col-span-3">
            <p className="lx-serif text-3xl">No custom media yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
