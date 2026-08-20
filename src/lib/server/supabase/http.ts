import { ApiError } from "@/lib/server/api/errors";
import { getSupabaseServerConfig } from "./config";

type SupabaseFetchOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  query?: string;
  body?: unknown;
  prefer?: string;
};

export async function supabaseRest<T>(
  table: string,
  options: SupabaseFetchOptions = {}
): Promise<T> {
  const config = getSupabaseServerConfig();

  if (!config.url || !config.serviceRoleKey) {
    throw new ApiError(
      "SUPABASE_NOT_CONFIGURED",
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.",
      503
    );
  }

  const query = options.query ? `?${options.query}` : "";
  const response = await fetch(
    `${config.url}/rest/v1/${encodeURIComponent(table)}${query}`,
    {
      method: options.method || "GET",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: options.prefer || "return=representation",
      },
      body:
        options.body === undefined ? undefined : JSON.stringify(options.body),
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
      "SUPABASE_REQUEST_FAILED",
      `Supabase returned HTTP ${response.status}.`,
      response.status >= 500 ? 503 : response.status,
      payload
    );
  }

  return payload as T;
}
