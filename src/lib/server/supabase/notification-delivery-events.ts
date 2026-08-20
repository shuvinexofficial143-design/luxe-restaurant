import { SupabaseRepository } from "./repository";
import type {
  DeliveryEventRow,
} from "@/lib/server/communications/types";

export class NotificationDeliveryEventRepository extends SupabaseRepository<DeliveryEventRow> {
  constructor() {
    super("notification_delivery_events");
  }

  async listForNotification(
    notificationId: string
  ) {
    return this.list({
      limit: 100,
      order: "created_at.desc",
      query: `notification_id=eq.${encodeURIComponent(
        notificationId
      )}`,
    });
  }
}

export const supabaseNotificationDeliveryEvents =
  new NotificationDeliveryEventRepository();
