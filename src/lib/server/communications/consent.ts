import type {
  CommunicationCategory,
  CommunicationChannel,
  CommunicationDecision,
  CommunicationPreferencesRow,
} from "./types";

export function communicationAllowed(input: {
  customerId?: string | null;
  channel: CommunicationChannel;
  category: CommunicationCategory;
  preferences?: CommunicationPreferencesRow | null;
}): CommunicationDecision {
  if (!input.customerId) {
    return {
      allowed:
        input.category === "TRANSACTIONAL" &&
        input.channel === "EMAIL",
      reason:
        input.category === "TRANSACTIONAL" &&
        input.channel === "EMAIL"
          ? "ALLOWED"
          : "NO_CUSTOMER",
    };
  }

  const preferences = input.preferences;

  if (!preferences) {
    return {
      allowed:
        input.category === "TRANSACTIONAL" &&
        input.channel === "EMAIL",
      reason:
        input.category === "TRANSACTIONAL" &&
        input.channel === "EMAIL"
          ? "ALLOWED"
          : "NO_CUSTOMER",
    };
  }

  if (input.category === "TRANSACTIONAL") {
    if (input.channel === "EMAIL") {
      return {
        allowed:
          preferences.transactional_email,
        reason: preferences.transactional_email
          ? "ALLOWED"
          : "TRANSACTIONAL_EMAIL_DISABLED",
      };
    }

    return {
      allowed:
        preferences.transactional_whatsapp,
      reason:
        preferences.transactional_whatsapp
          ? "ALLOWED"
          : "TRANSACTIONAL_WHATSAPP_DISABLED",
    };
  }

  if (input.channel === "EMAIL") {
    return {
      allowed: preferences.marketing_email,
      reason: preferences.marketing_email
        ? "ALLOWED"
        : "MARKETING_EMAIL_NOT_OPTED_IN",
    };
  }

  return {
    allowed: preferences.marketing_whatsapp,
    reason: preferences.marketing_whatsapp
      ? "ALLOWED"
      : "MARKETING_WHATSAPP_NOT_OPTED_IN",
  };
}
