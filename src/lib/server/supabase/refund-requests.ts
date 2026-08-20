import { SupabaseRepository } from "./repository";
import type {
  RefundRequestRow,
} from "@/lib/server/billing/types";

export class RefundRequestRepository extends SupabaseRepository<RefundRequestRow> {
  constructor() {
    super("refund_requests");
  }

  async listPending(limit = 100) {
    return this.list({
      limit,
      order: "created_at.asc",
      query:
        "status=in.(REQUESTED,PROCESSING,FAILED)",
    });
  }
}

export const supabaseRefundRequests =
  new RefundRequestRepository();
