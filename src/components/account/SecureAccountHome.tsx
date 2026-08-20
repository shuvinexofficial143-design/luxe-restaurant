import Link from "next/link";
import type { SafeCustomer } from "@/lib/server/auth/customer-types";
import CustomerSessionCard from "./CustomerSessionCard";

export default function SecureAccountHome({
  customer,
}: {
  customer: SafeCustomer;
}) {
  const links = [
    ["Reservations", "/reservations", "Book or manage a table."],
    ["Saved dishes", "/account", "Open existing guest preferences."],
    ["Loyalty", "/account/loyalty", "View the loyalty experience."],
    ["Gift Cards", "/gift-cards", "Buy or redeem a LUXE gift."],
  ];

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <CustomerSessionCard
        name={customer.name}
        email={customer.email}
        phone={customer.phone}
        emailVerified={customer.emailVerified}
      />

      <div>
        <p className="lx-kicker">Guest shortcuts</p>
        <h1 className="lx-serif mt-2 text-5xl">Your LUXE account.</h1>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {links.map(([title, href, text]) => (
            <Link
              key={href}
              href={href}
              className="rounded-[22px] bg-[#fffaf4] p-5"
            >
              <p className="lx-serif text-2xl">{title}</p>
              <p className="mt-2 text-xs leading-6 text-[#75645d]">
                {text}
              </p>
              <span className="mt-4 inline-flex text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
                Open ↗
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-5 rounded-[18px] bg-[#fff4de] p-4 text-[9px] leading-5 text-[#75645d]">
          Authentication is now database/session based. Existing loyalty,
          favourites and booking-history screens still need migration from
          browser storage to the customer database in the next phase.
        </p>
      </div>
    </div>
  );
}
