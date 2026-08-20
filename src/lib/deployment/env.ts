export const productionEnvironment = [
  {
    key: "NEXT_PUBLIC_APP_URL",
    label: "Public application URL",
    required: true,
  },
  {
    key: "SUPABASE_URL",
    label: "Supabase project URL",
    required: true,
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY",
    label: "Supabase server service role",
    required: true,
  },
  {
    key: "LUXE_SESSION_SECRET",
    label: "Session signing secret",
    required: true,
  },
  {
    key: "LUXE_JOB_RUNNER_SECRET",
    label: "Background worker secret",
    required: false,
  },
  {
    key: "CRON_SECRET",
    label: "Vercel cron authorization secret",
    required: false,
  },
  {
    key: "RAZORPAY_KEY_ID",
    label: "Razorpay merchant key",
    required: false,
  },
  {
    key: "RAZORPAY_KEY_SECRET",
    label: "Razorpay merchant secret",
    required: false,
  },
  {
    key: "RAZORPAY_WEBHOOK_SECRET",
    label: "Razorpay webhook secret",
    required: false,
  },
  {
    key: "RESEND_API_KEY",
    label: "Resend API key",
    required: false,
  },
  {
    key: "WHATSAPP_ACCESS_TOKEN",
    label: "WhatsApp access token",
    required: false,
  },
  {
    key: "WHATSAPP_APP_SECRET",
    label: "WhatsApp app secret",
    required: false,
  },
] as const;

export function environmentChecks() {
  return productionEnvironment.map((item) => ({
    key: item.key,
    label: item.label,
    required: item.required,
    ready: Boolean(process.env[item.key]),
    detail: process.env[item.key]
      ? "Configured"
      : item.required
        ? "Required value is missing."
        : "Optional integration is not configured.",
  }));
}
