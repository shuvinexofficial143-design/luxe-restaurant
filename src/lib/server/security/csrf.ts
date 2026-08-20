import {
  randomBytes,
  timingSafeEqual,
} from "node:crypto";
import type { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";

export const CSRF_COOKIE = "luxe_csrf";

export function createCsrfToken() {
  return randomBytes(24).toString("base64url");
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;

  return timingSafeEqual(
    Buffer.from(a, "utf8"),
    Buffer.from(b, "utf8")
  );
}

export function requireCsrf(request: NextRequest) {
  const cookie = request.cookies.get(CSRF_COOKIE)?.value || "";
  const header = request.headers.get("x-csrf-token") || "";

  if (!cookie || !header || !safeEqual(cookie, header)) {
    throw new ApiError(
      "CSRF_INVALID",
      "CSRF validation failed.",
      403
    );
  }
}
