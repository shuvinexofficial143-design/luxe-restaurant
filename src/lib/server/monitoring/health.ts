import { monitoringConfig } from "./config";
import type {
  HealthCheck,
  HealthReport,
} from "./types";
import { supabaseRest } from "@/lib/server/supabase/http";

async function timed<T>(
  fn: () => Promise<T>
) {
  const started = Date.now();
  const value = await fn();

  return {
    value,
    latencyMs: Date.now() - started,
  };
}

export async function buildLiveHealth(): Promise<HealthReport> {
  return {
    status: "OK",
    checkedAt: new Date().toISOString(),
    checks: [
      {
        key: "app",
        label: "Next.js application",
        state: "OK",
        detail: "Application process responded.",
      },
    ],
  };
}

export async function buildDeepHealth(): Promise<HealthReport> {
  const config = monitoringConfig();

  const checks: HealthCheck[] = [
    {
      key: "supabase-config",
      label: "Supabase configuration",
      state: config.supabaseConfigured
        ? "OK"
        : "NOT_CONFIGURED",
      detail: config.supabaseConfigured
        ? "Server credentials are configured."
        : "SUPABASE_URL or service role key is missing.",
    },
    {
      key: "razorpay",
      label: "Razorpay",
      state: config.razorpayConfigured
        ? "OK"
        : "NOT_CONFIGURED",
      detail: config.razorpayConfigured
        ? "Merchant credentials are configured."
        : "Payment credentials are missing.",
    },
    {
      key: "resend",
      label: "Resend email",
      state: config.resendConfigured
        ? "OK"
        : "NOT_CONFIGURED",
      detail: config.resendConfigured
        ? "Email provider credentials are configured."
        : "Resend credentials are missing.",
    },
    {
      key: "whatsapp",
      label: "WhatsApp Cloud API",
      state: config.whatsappConfigured
        ? "OK"
        : "NOT_CONFIGURED",
      detail: config.whatsappConfigured
        ? "WhatsApp provider credentials are configured."
        : "WhatsApp provider credentials are missing.",
    },
    {
      key: "job-runner",
      label: "Background worker secret",
      state: config.workerConfigured
        ? "OK"
        : "NOT_CONFIGURED",
      detail: config.workerConfigured
        ? "Worker endpoint can authenticate scheduler calls."
        : "LUXE_JOB_RUNNER_SECRET is missing.",
    },
  ];

  if (config.supabaseConfigured) {
    try {
      const probe = await timed(() =>
        supabaseRest<{ version: string }[]>(
          "schema_migrations",
          {
            query:
              "select=version&order=version.desc&limit=1",
          }
        )
      );

      checks.push({
        key: "database",
        label: "Supabase database",
        state: "OK",
        detail:
          probe.value[0]?.version
            ? `Latest recorded migration: ${probe.value[0].version}`
            : "Database responded; no migration row returned.",
        latencyMs: probe.latencyMs,
      });
    } catch (error) {
      checks.push({
        key: "database",
        label: "Supabase database",
        state: "DOWN",
        detail:
          error instanceof Error
            ? error.message
            : "Database probe failed.",
      });
    }
  }

  const hasDown = checks.some(
    (check) => check.state === "DOWN"
  );
  const hasDegraded = checks.some(
    (check) =>
      check.state === "DEGRADED" ||
      check.state === "NOT_CONFIGURED"
  );

  return {
    status: hasDown
      ? "DOWN"
      : hasDegraded
        ? "DEGRADED"
        : "OK",
    checkedAt: new Date().toISOString(),
    checks,
  };
}
