import { getSupabaseServerConfig, isSupabaseConfigured } from "./config";
import { supabaseRest } from "./http";

export type SupabaseHealth = {
  configured: boolean;
  connected: boolean;
  schemaReady: boolean;
  message: string;
};

export async function getSupabaseHealth(): Promise<SupabaseHealth> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      connected: false,
      schemaReady: false,
      message:
        "Supabase credentials are not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local.",
    };
  }

  const config = getSupabaseServerConfig();

  try {
    await supabaseRest<unknown[]>("schema_migrations", {
      query: "select=version&version=eq.002_supabase_core&limit=1",
    });

    return {
      configured: true,
      connected: true,
      schemaReady: true,
      message: `Connected to ${new URL(config.url).host}. Core migration table is reachable.`,
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Supabase health check failed.";

    return {
      configured: true,
      connected: false,
      schemaReady: false,
      message,
    };
  }
}
