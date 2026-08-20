import { createHash } from "node:crypto";
import { supabaseRpc } from "@/lib/server/supabase/rpc";
import { ApiError } from "@/lib/server/api/errors";

export type RateLimitResult = {
  allowed: boolean;
  count: number;
  limit: number;
  remaining: number;
  resetAt: string;
};

export function privateRateKey(...parts: string[]) {
  return createHash("sha256")
    .update(parts.join("|").toLowerCase())
    .digest("hex");
}

export async function requireDatabaseRateLimit(input: {
  key: string;
  limit: number;
  windowSeconds: number;
}) {
  const result = await supabaseRpc<RateLimitResult>(
    "luxe_security_rate_limit",
    {
      p_key: input.key,
      p_limit: input.limit,
      p_window_seconds: input.windowSeconds,
    }
  );

  if (!result.allowed) {
    throw new ApiError(
      "RATE_LIMITED",
      "Too many requests. Try again after the rate-limit window resets.",
      429,
      {
        remaining: result.remaining,
        resetAt: result.resetAt,
      }
    );
  }

  return result;
}
