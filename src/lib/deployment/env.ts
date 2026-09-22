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
    required: true,
  },
  {
    key: "RAZORPAY_KEY_ID",
    label: "Razorpay merchant key",
    required: true,
  },
  {
    key: "RAZORPAY_KEY_SECRET",
    label: "Razorpay merchant secret",
    required: true,
  },
  {
    key: "RAZORPAY_WEBHOOK_SECRET",
    label: "Razorpay webhook secret",
    required: true,
  },
  {
    key: "NEXT_PUBLIC_RAZORPAY_KEY_ID",
    label: "Razorpay public checkout key",
    required: true,
  },
  {
    key: "RESEND_API_KEY",
    label: "Resend API key",
    required: true,
  },
  {
    key: "LUXE_EMAIL_FROM",
    label: "Verified email sender",
    required: true,
  },
  {
    key: "WHATSAPP_ACCESS_TOKEN",
    label: "WhatsApp access token",
    required: true,
  },
  {
    key: "WHATSAPP_PHONE_NUMBER_ID",
    label: "WhatsApp phone number ID",
    required: true,
  },
  {
    key: "WHATSAPP_VERIFY_TOKEN",
    label: "WhatsApp webhook verify token",
    required: true,
  },
  {
    key: "WHATSAPP_APP_SECRET",
    label: "WhatsApp app secret",
    required: true,
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
