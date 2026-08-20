export type CRMSegment =
  | "NEW"
  | "REGULAR"
  | "LOYAL"
  | "VIP"
  | "AT_RISK"
  | "DORMANT";

export type CRMCustomerProfile = {
  id: string;
  customer_id: string;
  segment: CRMSegment;
  vip_score: number;
  lifetime_value: number;
  total_orders: number;
  total_reservations: number;
  last_activity_at: string | null;
  preferred_channel: "EMAIL" | "WHATSAPP";
  do_not_contact: boolean;
  updated_at?: string;
};

export type CRMCustomerTag = {
  id: string;
  customer_id: string;
  tag: string;
  created_at?: string;
};

export type CRMCustomerNote = {
  id: string;
  customer_id: string;
  author_label: string;
  note: string;
  created_at?: string;
};

export type CRMCustomerEvent = {
  id: string;
  customer_id: string;
  event_type: string;
  source: string;
  reference_id: string | null;
  amount: number | null;
  metadata_json: Record<string, unknown>;
  occurred_at: string;
};

export type CRMCustomerSummary = {
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
  };
  profile: CRMCustomerProfile;
  tags: CRMCustomerTag[];
};

export type CRMAudienceFilter = {
  segments?: CRMSegment[];
  minVipScore?: number;
  minLifetimeValue?: number;
  tags?: string[];
  preferredChannel?: "EMAIL" | "WHATSAPP";
  excludeDoNotContact?: boolean;
};
