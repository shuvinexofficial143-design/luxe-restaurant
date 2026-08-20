import { BaseRepository } from "../repository";
import { getDatabase } from "../client";
import type { DBRecord } from "../types";

export type AuditRow = DBRecord & {
  id: string;
  actor_user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  request_id: string;
  metadata_json: string;
  created_at: string;
};

export class AuditRepository extends BaseRepository<AuditRow> {
  constructor() {
    super(getDatabase(), "audit_logs");
  }
}

export const auditRepository = new AuditRepository();
