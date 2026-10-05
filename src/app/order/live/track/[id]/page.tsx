import { redirect } from "next/navigation";

export default async function LegacyLiveOrderTrackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect("/order/track/" + encodeURIComponent(id));
}
