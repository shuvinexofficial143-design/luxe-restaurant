import LuxeShell from "@/components/luxe/LuxeShell";
import SubscriptionPreferences from "@/components/notifications/SubscriptionPreferences";

export const metadata = { title: "Email Preferences" };

export default function NewsletterPreferencesPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <p className="lx-kicker">Email preferences</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Only what you want.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
            Turn event alerts, wine notes, offers, private dining and booking
            reminders on or off independently.
          </p>

          <div className="mt-6">
            <SubscriptionPreferences />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
