import { SupabaseRepository } from "./repository";
import type {
  WebhookEventRow,
} from "@/lib/server/webhooks/types";

export class WebhookEventRepository extends SupabaseRepository<WebhookEventRow> {
  constructor() {
    super("webhook_events");
  }

  async listRecent(limit = 100) {
    return this.list({
      limit,
      order: "received_at.desc",
    });
  }
}

export const supabaseWebhookEvents =
  new WebhookEventRepository();
