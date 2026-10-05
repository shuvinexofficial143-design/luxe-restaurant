import { redirect } from "next/navigation";

export default function LegacyLiveReservationsPage() {
  redirect("/reservations");
}
