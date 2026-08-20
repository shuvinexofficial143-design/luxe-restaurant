import type {
  IntegrationHealth,
  IntegrationHealthBundle,
} from "./types";
import { getIntegrationConfig } from "./config";

function unconfigured(
  name: IntegrationHealth["name"],
  message: string
): IntegrationHealth {
  return {
    name,
    configured: false,
    liveChecked: false,
    reachable: false,
    message,
  };
}

export async function getIntegrationHealth(): Promise<IntegrationHealthBundle> {
  const config = getIntegrationConfig();

  const razorpay = config.razorpay.keyId && config.razorpay.keySecret
    ? {
        name: "RAZORPAY" as const,
        configured: true,
        liveChecked: false,
        reachable: false,
        message:
          "Razorpay credentials are configured. Live connectivity is checked only when a real order is created.",
      }
    : unconfigured(
        "RAZORPAY",
        "RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are missing."
      );

  const resend = config.resend.apiKey
    ? {
        name: "RESEND" as const,
        configured: true,
        liveChecked: false,
        reachable: false,
        message:
          "Resend API key is configured. No test email is sent automatically.",
      }
    : unconfigured("RESEND", "RESEND_API_KEY is missing.");

  const whatsapp =
    config.whatsapp.accessToken && config.whatsapp.phoneNumberId
      ? {
          name: "WHATSAPP" as const,
          configured: true,
          liveChecked: false,
          reachable: false,
          message:
            "WhatsApp Cloud API credentials are configured. No message is sent automatically.",
        }
      : unconfigured(
          "WHATSAPP",
          "WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID is missing."
        );

  return { razorpay, resend, whatsapp };
}
