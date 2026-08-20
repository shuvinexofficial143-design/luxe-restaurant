import { ApiError } from "@/lib/server/api/errors";
import { getSupabaseServerConfig } from "./config";

export async function supabaseRpc<T>(
  functionName: string,
  args: Record<string, unknown>
): Promise<T> {
  const config = getSupabaseServerConfig();

  if (!config.url || !config.serviceRoleKey) {
    throw new ApiError(
      "SUPABASE_NOT_CONFIGURED",
      "Supabase is required for this operation.",
      503
    );
  }

  const response = await fetch(
    `${config.url}/rest/v1/rpc/${encodeURIComponent(functionName)}`,
    {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
      cache: "no-store",
    }
  );

  const raw = await response.text();
  let payload: unknown = null;

  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = raw;
    }
  }

  if (!response.ok) {
    throw new ApiError(
      "SUPABASE_RPC_FAILED",
      `Database function ${functionName} failed.`,
      response.status >= 500 ? 503 : response.status,
      payload
    );
  }

  return payload as T;
}
