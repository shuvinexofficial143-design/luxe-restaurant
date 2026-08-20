import LuxeShell from "@/components/luxe/LuxeShell";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import NotificationPreferences from "@/components/notifications/NotificationPreferences";

export const metadata = { title: "Notifications" };

export default function NotificationsPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[900px]">
          <p className="lx-kicker">Guest updates</p>
          <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
            Notifications.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#75645d]">
            Events, wine, offers and booking reminders in one local demo inbox.
          </p>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_300px]">
            <NotificationCenter />
            <NotificationPreferences />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
