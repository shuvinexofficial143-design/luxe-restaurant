export function getIntegrationConfig() {
  return {
    razorpay: {
      keyId: process.env.RAZORPAY_KEY_ID || "",
      keySecret: process.env.RAZORPAY_KEY_SECRET || "",
      webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || "",
      publicKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
    },
    resend: {
      apiKey: process.env.RESEND_API_KEY || "",
      from:
        process.env.LUXE_EMAIL_FROM ||
        "LUXE Restaurant <reservations@example.com>",
    },
    whatsapp: {
      accessToken: process.env.WHATSAPP_ACCESS_TOKEN || "",
      phoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID || "",
      verifyToken: process.env.WHATSAPP_VERIFY_TOKEN || "",
      graphVersion: process.env.WHATSAPP_GRAPH_VERSION || "v23.0",
    },
  };
}

export function integrationConfigurationStatus() {
  const config = getIntegrationConfig();

  return {
    razorpay: Boolean(config.razorpay.keyId && config.razorpay.keySecret),
    resend: Boolean(config.resend.apiKey && config.resend.from),
    whatsapp: Boolean(
      config.whatsapp.accessToken && config.whatsapp.phoneNumberId
    ),
  };
}
