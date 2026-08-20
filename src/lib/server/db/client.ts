import { getServerEnvironment } from "@/lib/server/env";
import type {
  DatabaseAdapter,
  DatabaseHealth,
  DatabaseQuery,
  DBRecord,
  QueryResult,
} from "./types";

class UnconfiguredDatabaseAdapter implements DatabaseAdapter {
  async health(): Promise<DatabaseHealth> {
    return {
      configured: false,
      connected: false,
      adapter: "UNCONFIGURED",
      message:
        "DATABASE_URL is not configured. The backend foundation is ready, but no database connection is active.",
    };
  }

  async query<T extends DBRecord>(
    _query: DatabaseQuery
  ): Promise<QueryResult<T>> {
    void _query;
    throw new Error(
      "database_not_configured: Set DATABASE_URL and connect a PostgreSQL adapter before executing server queries."
    );
  }
}

class PostgresReadyAdapter implements DatabaseAdapter {
  async health(): Promise<DatabaseHealth> {
    return {
      configured: true,
      connected: false,
      adapter: "POSTGRES_READY",
      message:
        "DATABASE_URL is present. A PostgreSQL driver is intentionally not installed in this batch; connection activation is the next backend step.",
    };
  }

  async query<T extends DBRecord>(
    _query: DatabaseQuery
  ): Promise<QueryResult<T>> {
    void _query;
    throw new Error(
      "postgres_driver_pending: DATABASE_URL exists but the PostgreSQL driver/connector has not been activated yet."
    );
  }
}

export function getDatabase(): DatabaseAdapter {
  const env = getServerEnvironment();
  return env.databaseUrl
    ? new PostgresReadyAdapter()
    : new UnconfiguredDatabaseAdapter();
}
