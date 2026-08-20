import { SupabaseRepository } from "./repository";
import type {
  AsyncJobRow,
} from "@/lib/server/jobs/types";

export class AsyncJobRepository extends SupabaseRepository<AsyncJobRow> {
  constructor() {
    super("async_jobs");
  }

  async listFailures(limit = 100) {
    return this.list({
      limit,
      order: "updated_at.desc",
      query: "status=in.(FAILED,DEAD)",
    });
  }

  async listRecent(limit = 100) {
    return this.list({
      limit,
      order: "created_at.desc",
    });
  }
}

export const supabaseAsyncJobs =
  new AsyncJobRepository();
