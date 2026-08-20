import Link from "next/link";
import type { SubscriptionRecord } from "@/lib/notifications/types";

export default function SubscriptionStatusCard({
  subscription,
}: {
  subscription: SubscriptionRecord;
}) {
  const enabled = Object.values(subscription.preferences).filter(Boolean).length;

  return (
    <aside className="rounded-[26px] bg-[#201713] p-5 text-white lg:sticky lg:top-[110px] lg:self-start">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Subscription
      </p>
      <h2 className="lx-serif mt-2 text-3xl">{subscription.name}</h2>
      <p className="mt-1 break-all text-xs text-white/45">
        {subscription.email}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <div className="rounded-[16px] bg-white/[.06] p-3">
          <p className="lx-serif text-2xl text-[#efc28b]">{enabled}</p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-white/40">
            enabled
          </p>
        </div>
        <div className="rounded-[16px] bg-white/[.06] p-3">
          <p className="lx-serif text-2xl text-[#efc28b]">
            {subscription.active ? "On" : "Off"}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[.1em] text-white/40">
            status
          </p>
        </div>
      </div>

      <Link
        href="/newsletter/unsubscribe"
        className="mt-5 flex min-h-11 items-center justify-center rounded-[15px] border border-white/15 text-[8px] uppercase tracking-[.11em]"
      >
        Unsubscribe
      </Link>
    </aside>
  );
}
