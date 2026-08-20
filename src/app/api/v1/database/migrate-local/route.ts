import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { runLocalMigration } from "@/lib/server/migration/run";
import type {
  LocalMigrationSection,
  MigrationPayload,
} from "@/lib/server/migration/types";

const allowed: LocalMigrationSection[] = ["reservations", "orders", "cms"];

export async function POST(request: Request) {
  const requestId = getRequestId(request);

  try {
    const raw = (await request.json()) as Partial<MigrationPayload>;

    if (!raw.section || !allowed.includes(raw.section)) {
      throw new ApiError(
        "INVALID_MIGRATION_SECTION",
        "section must be reservations, orders or cms.",
        422
      );
    }

    if (!Array.isArray(raw.records)) {
      throw new ApiError(
        "INVALID_MIGRATION_RECORDS",
        "records must be an array.",
        422
      );
    }

    const result = await runLocalMigration({
      section: raw.section,
      records: raw.records,
    });

    return apiSuccess(result, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
