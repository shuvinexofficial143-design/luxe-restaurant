export default function CMSContentFallback({
  title = "Published content is not available yet.",
}: {
  title?: string;
}) {
  return (
    <div className="rounded-[24px] bg-[#fff4de] p-6 text-[#201713]">
      <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        CMS connection
      </p>
      <h2 className="lx-serif mt-2 text-3xl">{title}</h2>
      <p className="mt-3 text-xs leading-6 text-[#75645d]">
        This section renders only records that are actually PUBLISHED in the
        connected CMS database. It does not fabricate live content.
      </p>
    </div>
  );
}
