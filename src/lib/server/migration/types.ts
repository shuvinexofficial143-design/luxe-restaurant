export type LocalMigrationSection =
  | "reservations"
  | "orders"
  | "cms";

export type MigrationItemResult = {
  id: string;
  ok: boolean;
  message: string;
};

export type MigrationSectionResult = {
  section: LocalMigrationSection;
  attempted: number;
  migrated: number;
  failed: number;
  items: MigrationItemResult[];
};

export type MigrationPayload = {
  section: LocalMigrationSection;
  records: unknown[];
};
