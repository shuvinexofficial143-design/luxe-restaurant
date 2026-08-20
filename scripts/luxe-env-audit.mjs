const requiredCore = [
  "NEXT_PUBLIC_APP_URL",
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "LUXE_SESSION_SECRET",
];

const fullFeature = [
  "LUXE_JOB_RUNNER_SECRET",
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

function status(name) {
  return process.env[name] ? "SET" : "MISSING";
}

console.log("LUXE production environment audit\n");

for (const name of requiredCore) {
  console.log(`[CORE] ${name}: ${status(name)}`);
}

for (const name of fullFeature) {
  console.log(`[FEATURE] ${name}: ${status(name)}`);
}

if (process.env.LUXE_ADMIN_BOOTSTRAP_SECRET) {
  console.log(
    "[SECURITY] LUXE_ADMIN_BOOTSTRAP_SECRET: SET — remove/rotate after initial OWNER bootstrap."
  );
}

const missingCore = requiredCore.filter(
  (name) => !process.env[name]
);

if (missingCore.length) {
  console.error(
    `\nCore production environment incomplete: ${missingCore.join(", ")}`
  );
  process.exit(1);
}

console.log("\nCore production environment: READY");
