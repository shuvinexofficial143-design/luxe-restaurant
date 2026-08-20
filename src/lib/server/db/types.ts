export type DBPrimitive = string | number | boolean | null;

export type DBRecord = Record<string, DBPrimitive>;

export type DatabaseHealth = {
  configured: boolean;
  connected: boolean;
  adapter: "UNCONFIGURED" | "POSTGRES_READY";
  message: string;
};

export type QueryResult<T extends DBRecord> = {
  rows: T[];
  rowCount: number;
};

export type DatabaseQuery = {
  text: string;
  values?: DBPrimitive[];
};

export interface DatabaseAdapter {
  health(): Promise<DatabaseHealth>;
  query<T extends DBRecord>(query: DatabaseQuery): Promise<QueryResult<T>>;
}
