import { secureIdentifier } from "@/lib/server/security/admin-token";
import { supabaseCommunicationPreferences } from "@/lib/server/supabase/communication-preferences";
import type {
  CommunicationPreferencesRow,
} from "./types";

export async function ensureCommunicationPreferences(
  customerId: string
) {
  const existing =
    await supabaseCommunicationPreferences.findForCustomer(
      customerId
    );

  if (existing) return existing;

  return supabaseCommunicationPreferences.insert({
    id: secureIdentifier("COMMPREF"),
    customer_id: customerId,
    transactional_email: true,
    transactional_whatsapp: false,
    marketing_email: false,
    marketing_whatsapp: false,
    language: "en",
  });
}

export async function updateCommunicationPreferences(
  customerId: string,
  patch: Partial<
    Pick<
      CommunicationPreferencesRow,
      | "transactional_email"
      | "transactional_whatsapp"
      | "marketing_email"
      | "marketing_whatsapp"
      | "language"
    >
  >
) {
  const current =
    await ensureCommunicationPreferences(
      customerId
    );

  return supabaseCommunicationPreferences.patch(
    current.id,
    {
      ...patch,
      updated_at: new Date().toISOString(),
    }
  );
}
