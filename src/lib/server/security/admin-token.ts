import { createHash, randomBytes } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "luxe_admin_session";

export function createAdminSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashAdminSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function adminSessionExpiry(hours = 12) {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export function secureIdentifier(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}
