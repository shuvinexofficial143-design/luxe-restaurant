import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";
import CMSPreview from "@/components/cms/CMSPreview";

export const metadata = { title: "CMS Preview" };

export default async function CMSPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AdminShell title="Content Preview" eyebrow="CMS Preview">
      <div className="mx-auto max-w-[1000px]">
        <Link
          href="/admin/cms"
          className="mb-4 inline-flex rounded-full border border-[#4a3025]/10 bg-white px-4 py-3 text-[8px] uppercase tracking-[.11em]"
        >
          ← CMS home
        </Link>
        <CMSPreview id={id} />
      </div>
    </AdminShell>
  );
}
