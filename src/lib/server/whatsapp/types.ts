export type WhatsAppTextInput = {
  to: string;
  text: string;
};

export type WhatsAppTemplateInput = {
  to: string;
  templateName: string;
  languageCode?: string;
  components?: unknown[];
};

export type WhatsAppSendResult = {
  messaging_product: "whatsapp";
  contacts?: { input: string; wa_id: string }[];
  messages?: { id: string }[];
};
