import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { ApiError } from "@/lib/server/api/errors";

const KEY_LENGTH = 64;

export function validateAdminPassword(password: string) {
  const failures: string[] = [];

  if (password.length < 14) failures.push("Use at least 14 characters.");
  if (!/[A-Z]/.test(password)) failures.push("Add an uppercase letter.");
  if (!/[a-z]/.test(password)) failures.push("Add a lowercase letter.");
  if (!/[0-9]/.test(password)) failures.push("Add a number.");
  if (!/[^A-Za-z0-9]/.test(password)) failures.push("Add a symbol.");

  return { valid: failures.length === 0, failures };
}

export function hashAdminPassword(password: string) {
  const policy = validateAdminPassword(password);

  if (!policy.valid) {
    throw new ApiError(
      "WEAK_ADMIN_PASSWORD",
      "Admin password does not meet the security policy.",
      422,
      { failures: policy.failures }
    );
  }

  const salt = randomBytes(16);
  const derived = scryptSync(password, salt, KEY_LENGTH);

  return `scrypt$${salt.toString("base64url")}$${derived.toString(
    "base64url"
  )}`;
}

export function verifyAdminPassword(
  password: string,
  stored: string
) {
  const [scheme, saltText, hashText] = stored.split("$");

  if (scheme !== "scrypt" || !saltText || !hashText) return false;

  try {
    const salt = Buffer.from(saltText, "base64url");
    const expected = Buffer.from(hashText, "base64url");
    const actual = scryptSync(password, salt, expected.length);

    return (
      expected.length === actual.length &&
      timingSafeEqual(expected, actual)
    );
  } catch {
    return false;
  }
}
