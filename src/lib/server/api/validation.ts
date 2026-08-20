import { ApiError } from "./errors";

export function requireString(
  input: Record<string, unknown>,
  key: string,
  options: { min?: number; max?: number } = {}
) {
  const value = input[key];

  if (typeof value !== "string") {
    throw new ApiError("VALIDATION_ERROR", `${key} must be a string.`, 422);
  }

  const clean = value.trim();
  const min = options.min ?? 1;
  const max = options.max ?? 500;

  if (clean.length < min || clean.length > max) {
    throw new ApiError(
      "VALIDATION_ERROR",
      `${key} must be between ${min} and ${max} characters.`,
      422
    );
  }

  return clean;
}

export function requirePositiveInteger(
  input: Record<string, unknown>,
  key: string,
  max = 100
) {
  const value = input[key];

  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < 1 ||
    value > max
  ) {
    throw new ApiError(
      "VALIDATION_ERROR",
      `${key} must be an integer between 1 and ${max}.`,
      422
    );
  }

  return value;
}

export async function parseJsonObject(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    throw new ApiError("INVALID_JSON", "Request body must be valid JSON.", 400);
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new ApiError("INVALID_BODY", "Request body must be an object.", 400);
  }

  return payload as Record<string, unknown>;
}
