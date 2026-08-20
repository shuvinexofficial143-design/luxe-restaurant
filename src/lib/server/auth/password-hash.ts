import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { ApiError } from "@/lib/server/api/errors";
import { evaluatePasswordPolicy } from "./password-policy";

const KEY_LENGTH = 64;

export function hashPassword(password: string) {
  const policy = evaluatePasswordPolicy(password);

  if (!policy.valid) {
    throw new ApiError(
      "WEAK_PASSWORD",
      "Password does not meet the security policy.",
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

export function verifyPassword(password: string, stored: string) {
  const [scheme, saltText, hashText] = stored.split("$");

  if (scheme !== "scrypt" || !saltText || !hashText) {
    return false;
  }

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
