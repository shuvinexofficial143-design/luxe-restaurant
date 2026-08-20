import { SupabaseRepository } from "./repository";

export type CRMCampaignRow = {
  id: string;
  name: string;
  channel: "EMAIL" | "WHATSAPP";
  audience_filter: Record<string, unknown>;
  status: string;
  estimated_recipients: number;
  sent_count: number;
  created_at?: string;
  updated_at?: string;
};

export const supabaseCRMCampaigns =
  new SupabaseRepository<CRMCampaignRow>("crm_campaigns");
