export default function SEOFieldGuide() {
  const fields = [
    ["seo_title", "Search/social title override."],
    ["seo_description", "Search description override."],
    ["canonical_path", "Preferred canonical path when a duplicate route exists."],
    ["og_image_url", "Open Graph image URL."],
    ["noindex", "Exclude a published content item from search indexing."],
    ["published_at", "Public publish timestamp for feeds and structured data."],
  ];

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">CMS SEO fields</p>
      <div className="mt-4 space-y-2">
        {fields.map(([name, text]) => (
          <div key={name} className="rounded-[14px] bg-white p-3">
            <p className="font-mono text-[10px] text-[#7c241e]">{name}</p>
            <p className="mt-1 text-[9px] leading-5 text-[#75645d]">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
