import AdminShell from "@/components/admin/AdminShell";
import EventManager from "@/components/admin/EventManager";

export const metadata = { title: "Admin Events" };

export default function AdminEventsPage() {
  return (
    <AdminShell title="Event Bookings" eyebrow="Experiences">
      <div className="mx-auto max-w-[1320px]">
        <EventManager />
      </div>
    </AdminShell>
  );
}
