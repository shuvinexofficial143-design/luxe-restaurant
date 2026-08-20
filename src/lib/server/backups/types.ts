export type BackupExportRow = {
  id: string;
  requested_by: string | null;
  scope: string;
  status: "CREATED" | "EXPORTED" | "FAILED";
  record_count: number;
  manifest_json: Record<string, unknown>;
  last_error: string | null;
  created_at: string;
};

export type SanitizedBackup = {
  generatedAt: string;
  scope: string;
  tables: Record<string, unknown[]>;
  recordCount: number;
  notes: string[];
};
