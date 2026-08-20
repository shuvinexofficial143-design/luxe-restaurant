export type IntegrationName = "RAZORPAY" | "RESEND" | "WHATSAPP";

export type IntegrationHealth = {
  name: IntegrationName;
  configured: boolean;
  liveChecked: boolean;
  reachable: boolean;
  message: string;
};

export type IntegrationHealthBundle = {
  razorpay: IntegrationHealth;
  resend: IntegrationHealth;
  whatsapp: IntegrationHealth;
};
