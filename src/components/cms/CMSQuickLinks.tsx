import Link from "next/link";

const links = [
  ["Media Library", "/admin/cms/media", "External image URLs and alt text"],
  ["Revision History", "/admin/cms/revisions", "Local snapshots of CMS edits"],
  ["Approval Queue", "/admin/cms/approvals", "Review draft approval requests"],
];

export default function CMSQuickLinks() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {links.map(([title, href, text]) => (
        <Link
          key={href}
          href={href}
          className="rounded-[22px] bg-[#335f50] p-5 text-white"
        >
          <p className="lx-serif text-2xl text-[#efc99a]">{title}</p>
          <p className="mt-2 text-[10px] leading-5 text-white/50">{text}</p>
          <span className="mt-4 inline-flex text-[8px] uppercase tracking-[.11em]">
            Open ↗
          </span>
        </Link>
      ))}
    </div>
  );
}
