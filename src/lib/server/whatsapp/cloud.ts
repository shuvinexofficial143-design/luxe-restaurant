import { ApiError } from "@/lib/server/api/errors";

type WhatsAppSendResult = {
  messages?: {
    id?: string;
  }[];
};

type WhatsAppTemplateInput = {
  to: string;
  templateName: string;
  languageCode?: string;
  components?: unknown[];
};

function providerConfig() {
  const accessToken =
    process.env.WHATSAPP_ACCESS_TOKEN || "";
  const phoneNumberId =
    process.env.WHATSAPP_PHONE_NUMBER_ID || "";
  const version =
    process.env.WHATSAPP_GRAPH_VERSION ||
    "v23.0";

  if (!accessToken || !phoneNumberId) {
    throw new ApiError(
      "WHATSAPP_PROVIDER_NOT_CONFIGURED",
      "WhatsApp Cloud API is not configured.",
      503
    );
  }

  return {
    accessToken,
    phoneNumberId,
    version,
  };
}

async function sendWhatsAppPayload(
  payload: Record<string, unknown>
) {
  const {
    accessToken,
    phoneNumberId,
    version,
  } = providerConfig();

  const response = await fetch(
    `https://graph.facebook.com/${version}/${encodeURIComponent(
      phoneNumberId
    )}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    }
  );

  const body =
    (await response.json()) as
      | WhatsAppSendResult
      | {
          error?: {
            message?: string;
          };
        };

  if (
    !response.ok ||
    !("messages" in body)
  ) {
    throw new ApiError(
      "WHATSAPP_SEND_FAILED",
      "WhatsApp Cloud API rejected the message.",
      response.status >= 500 ? 503 : 422,
      body
    );
  }

  return body as WhatsAppSendResult;
}

export function sendWhatsAppText(input: {
  to: string;
  text: string;
}) {
  return sendWhatsAppPayload({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: input.to,
    type: "text",
    text: {
      preview_url: false,
      body: input.text.slice(0, 4096),
    },
  });
}

export function sendWhatsAppTemplate(
  input: WhatsAppTemplateInput
) {
  return sendWhatsAppPayload({
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: input.to,
    type: "template",
    template: {
      name: input.templateName,
      language: {
        code:
          input.languageCode || "en",
      },
      components:
        input.components || [],
    },
  });
}
