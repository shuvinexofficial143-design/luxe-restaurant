import { restaurantLocation } from "@/lib/visit/data";
import { googleMapsSearchUrl } from "@/lib/visit/directions";

export default function LocationMapCard() {
  const embedQuery = encodeURIComponent(
    restaurantLocation.fullAddress
  );
  const embedUrl =
    "https://www.google.com/maps?q=" + embedQuery + "&output=embed";

  return (
    <div className="overflow-hidden rounded-[28px] border border-[#4a3025]/10 bg-[#fffaf4]">
      <div className="relative min-h-[360px] overflow-hidden bg-[#e8ded4]">
        <iframe
          title="LUXE Restaurant location in Vijay Nagar, Indore"
          src={embedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
        <span className="absolute left-3 top-3 rounded-full bg-[#201713]/90 px-3 py-2 text-[10px] uppercase tracking-[.12em] text-[#efc28b] shadow-lg backdrop-blur-md">
          Vijay Nagar · Indore
        </span>
      </div>

      <div className="p-4">
        <a
          href={googleMapsSearchUrl()}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#201713] text-[10px] uppercase tracking-[.13em] text-white"
        >
          Open in Google Maps ↗
        </a>
        <p className="mt-3 text-[11px] leading-5 text-[#8a756b]">
          Use Google Maps for live directions, traffic and arrival planning.
        </p>
      </div>
    </div>
  );
}
