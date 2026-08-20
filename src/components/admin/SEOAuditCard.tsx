export default function SEOAuditCard() {
  const checks = [
    ["Canonical", "Locale pages can emit canonical URLs."],
    ["hreflang", "English and Hindi alternates are generated together."],
    ["Structured data", "Restaurant, MenuItem, Article and Event JSON-LD helpers."],
    ["Sitemap", "Localized routes plus published CMS records."],
    ["Robots", "Admin, API and secure account routes are excluded."],
    ["CMS metadata", "SEO title, description, OG image, noindex and canonical path."],
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {checks.map(([title, text]) => (
        <div key={title} className="rounded-[18px] bg-[#fffaf4] p-4">
          <p className="lx-serif text-xl">{title}</p>
          <p className="mt-2 text-[9px] leading-5 text-[#75645d]">{text}</p>
        </div>
      ))}
    </div>
  );
}
