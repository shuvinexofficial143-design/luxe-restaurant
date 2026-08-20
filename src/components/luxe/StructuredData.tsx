export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "LUXE",
    description:
      "Contemporary fine dining shaped by fire, season, provenance and warm hospitality.",
    servesCuisine: ["Contemporary", "Fine Dining"],
    priceRange: "₹₹₹₹",
    telephone: "+91 70000 12345",
    email: "hello@luxe-demo.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "18 Ember House, River Quarter",
      addressLocality: "Ujjain",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "18:00",
        closes: "23:30",
      },
    ],
    acceptsReservations: true,
    menu: "https://luxe-restaurant.example.com/menu",
    url: "https://luxe-restaurant.example.com",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
