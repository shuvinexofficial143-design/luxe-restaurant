"use client";

import { FormEvent, useState } from "react";
import type { CMSCollection, CMSItem, CMSStatus } from "@/lib/cms/types";
import { cmsStore } from "@/lib/cms/storage";
import { slugify } from "@/lib/cms/utils";
import CMSImageField from "./CMSImageField";

export default function CMSItemEditor({
  collection,
  item,
  onDone,
}: {
  collection: CMSCollection;
  item: CMSItem | null;
  onDone: () => void;
}) {
  const [title, setTitle] = useState(item?.title || "");
  const [slug, setSlug] = useState(item?.slug || "");
  const [excerpt, setExcerpt] = useState(item?.excerpt || "");
  const [category, setCategory] = useState(item?.category || "");
  const [image, setImage] = useState(item?.image || "");
  const [price, setPrice] = useState(
    typeof item?.price === "number" ? String(item.price) : ""
  );
  const [featured, setFeatured] = useState(Boolean(item?.featured));
  const [sortOrder, setSortOrder] = useState(String(item?.sortOrder || 1));
  const [status, setStatus] = useState<CMSStatus>(item?.status || "DRAFT");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      title,
      slug: slug || slugify(title),
      excerpt,
      image,
      category,
      price: price ? Number(price) : undefined,
      featured,
      sortOrder: Number(sortOrder) || 1,
      status,
    };

    if (item) {
      cmsStore.update(item.id, payload);
    } else {
      cmsStore.create(collection, payload);
    }

    onDone();
  }

  function requestApproval() {
    const current = item || cmsStore.create(collection, {
      title,
      slug: slug || slugify(title),
      excerpt,
      image,
      category,
      price: price ? Number(price) : undefined,
      featured,
      sortOrder: Number(sortOrder) || 1,
      status: "DRAFT",
    });

    cmsStore.requestApproval(current);
    onDone();
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="lx-kicker">{item ? "Edit content" : "New content"}</p>
          <h3 className="lx-serif mt-1 text-3xl">
            {item ? item.title : "Create item"}
          </h3>
        </div>
        <button
          type="button"
          onClick={onDone}
          className="grid h-10 w-10 place-items-center rounded-full bg-[#f3e7dc]"
        >
          ×
        </button>
      </div>

      <div className="mt-5 space-y-3">
        <label className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
          Title
          <input
            required
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              if (!item) setSlug(slugify(event.target.value));
            }}
            className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case tracking-normal"
          />
        </label>

        <label className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
          Slug
          <input
            required
            value={slug}
            onChange={(event) => setSlug(slugify(event.target.value))}
            className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case tracking-normal"
          />
        </label>

        <label className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
          Category
          <input
            required
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case tracking-normal"
          />
        </label>

        <label className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
          Excerpt
          <textarea
            required
            rows={4}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            className="rounded-[14px] border border-[#4a3025]/10 bg-white p-3 text-sm normal-case tracking-normal"
          />
        </label>

        <CMSImageField value={image} onChange={setImage} />

        <div className="grid grid-cols-2 gap-2">
          <label className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
            Price
            <input
              type="number"
              min="0"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
            />
          </label>

          <label className="grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
            Sort order
            <input
              type="number"
              min="1"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setFeatured((value) => !value)}
            className={`h-11 rounded-[14px] border text-[8px] uppercase tracking-[.1em] ${
              featured
                ? "border-[#335f50] bg-[#335f50] text-white"
                : "border-[#4a3025]/10 bg-white"
            }`}
          >
            {featured ? "Featured ✓" : "Featured"}
          </button>

          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as CMSStatus)}
            className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-[8px] uppercase tracking-[.08em]"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="submit"
          className="h-12 rounded-[15px] bg-[#7c241e] text-[8px] uppercase tracking-[.12em] text-white"
        >
          Save content
        </button>
        <button
          type="button"
          onClick={requestApproval}
          className="h-12 rounded-[15px] bg-[#201713] text-[8px] uppercase tracking-[.12em] text-white"
        >
          Send for approval
        </button>
      </div>

      {item ? (
        <button
          type="button"
          onClick={() => {
            cmsStore.remove(item.id);
            onDone();
          }}
          className="mt-2 h-11 w-full rounded-[14px] border border-[#7c241e]/15 text-[8px] uppercase tracking-[.11em] text-[#7c241e]"
        >
          Delete local item
        </button>
      ) : null}
    </form>
  );
}
