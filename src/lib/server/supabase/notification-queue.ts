import { SupabaseRepository } from "./repository";
import type {
  NotificationQueueRow,
} from "@/lib/server/notifications/types";

export class NotificationQueueRepository extends SupabaseRepository<NotificationQueueRow> {
  constructor() {
    super("notification_queue");
  }

  async listRecent(limit = 100) {
    return this.list({
      limit,
      order: "created_at.desc",
    });
  }
}

export const supabaseNotificationQueue =
  new NotificationQueueRepository();
