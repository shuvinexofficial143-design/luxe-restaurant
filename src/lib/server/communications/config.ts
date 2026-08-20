export function emailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.LUXE_EMAIL_FROM
  );
}

export function whatsappConfigured() {
  return Boolean(
    process.env.WHATSAPP_ACCESS_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID
  );
}

export function communicationEnvironment() {
  return {
    email: {
      configured: emailConfigured(),
      from:
        process.env.LUXE_EMAIL_FROM ||
        "Not configured",
    },
    whatsapp: {
      configured: whatsappConfigured(),
      phoneNumberId:
        process.env.WHATSAPP_PHONE_NUMBER_ID
          ? "configured"
          : "missing",
    },
  };
}
