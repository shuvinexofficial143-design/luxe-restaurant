const requiredProduction = [
  "NEXT_PUBLIC_APP_URL",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "LUXE_SESSION_SECRET",
  "CRON_SECRET",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
  "RESEND_API_KEY",
  "LUXE_EMAIL_FROM",
  "WHATSAPP_ACCESS_TOKEN",
  "WHATSAPP_PHONE_NUMBER_ID",
  "WHATSAPP_VERIFY_TOKEN",
  "WHATSAPP_APP_SECRET",
];

const optional = [
  "LUXE_JOB_RUNNER_SECRET",
];

function status(name) {
  return process.env[name] ? "SET" : "MISSING";
}

console.log("LUXE production environment audit\n");

for (const name of requiredProduction) {
  console.log(`[REQUIRED] ${name}: ${status(name)}`);
}

for (const name of optional) {
  console.log(`[OPTIONAL] ${name}: ${status(name)}`);
}

if (process.env.LUXE_ADMIN_BOOTSTRAP_SECRET) {
  console.log(
    "[SECURITY] LUXE_ADMIN_BOOTSTRAP_SECRET: SET — remove/rotate after initial OWNER bootstrap."
  );
}

const missing = requiredProduction.filter(
  (name) => !process.env[name]
);

if (missing.length) {
  console.error(
    `\nProduction environment incomplete: ${missing.join(", ")}`
  );
  process.exit(1);
}

console.log("\nProduction environment: READY");
