export function monitoringConfig() {
  return {
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "",
    supabaseConfigured: Boolean(
      process.env.SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY
    ),
    razorpayConfigured: Boolean(
      process.env.RAZORPAY_KEY_ID &&
      process.env.RAZORPAY_KEY_SECRET
    ),
    resendConfigured: Boolean(
      process.env.RESEND_API_KEY &&
      process.env.LUXE_EMAIL_FROM
    ),
    whatsappConfigured: Boolean(
      process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID
    ),
    workerConfigured: Boolean(
      process.env.LUXE_JOB_RUNNER_SECRET
    ),
  };
}
