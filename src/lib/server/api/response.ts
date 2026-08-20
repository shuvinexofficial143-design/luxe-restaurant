import { NextResponse } from "next/server";
import type { ApiFailure, ApiSuccess } from "./types";
import { toApiError } from "./errors";

export function apiSuccess<T>(
  data: T,
  requestId: string,
  status = 200
) {
  const body: ApiSuccess<T> = {
    ok: true,
    data,
    requestId,
  };

  return NextResponse.json(body, { status });
}

export function apiFailure(error: unknown, requestId: string) {
  const normalized = toApiError(error);

  const body: ApiFailure = {
    ok: false,
    error: {
      code: normalized.code,
      message: normalized.message,
      details: normalized.details,
    },
    requestId,
  };

  return NextResponse.json(body, { status: normalized.status });
}
