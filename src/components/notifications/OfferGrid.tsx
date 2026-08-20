import type { Offer } from "@/lib/notifications/types";
import OfferCard from "./OfferCard";

export default function OfferGrid({
  offers,
}: {
  offers: Offer[];
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}
