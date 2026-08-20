export class ApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status = 400,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function toApiError(error: unknown) {
  if (error instanceof ApiError) return error;

  if (error instanceof Error) {
    if (error.message.startsWith("database_not_configured")) {
      return new ApiError(
        "DATABASE_NOT_CONFIGURED",
        "The database is not connected yet.",
        503
      );
    }

    if (error.message.startsWith("postgres_driver_pending")) {
      return new ApiError(
        "POSTGRES_DRIVER_PENDING",
        "DATABASE_URL is present, but the PostgreSQL connector is not active yet.",
        503
      );
    }
  }

  return new ApiError(
    "INTERNAL_ERROR",
    "An unexpected server error occurred.",
    500
  );
}
