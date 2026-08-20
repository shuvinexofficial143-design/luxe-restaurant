import { SupabaseRepository } from "./repository";

export type AuditDBRow = {
  id: string;
  actor_user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  request_id: string;
  metadata_json: Record<string, unknown>;
  created_at?: string;
};

export const supabaseAudit = new SupabaseRepository<AuditDBRow>("audit_logs");
