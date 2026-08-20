import { supabaseRest } from "@/lib/server/supabase/http";

export async function exportCustomerData(
  customerId: string,
  email: string
) {
  const [
    customer,
    profile,
    reservations,
    orders,
    loyalty,
    crm,
    tags,
    communications,
    notifications,
    receipts,
  ] = await Promise.all([
    supabaseRest<unknown[]>(
      "customers",
      {
        query: `select=id,name,email,phone,active,created_at&id=eq.${encodeURIComponent(
          customerId
        )}&limit=1`,
      }
    ),
    supabaseRest<unknown[]>(
      "customer_profiles",
      {
        query: `select=*&customer_id=eq.${encodeURIComponent(
          customerId
        )}&limit=1`,
      }
    ),
    supabaseRest<unknown[]>(
      "reservations",
      {
        query: `select=*&email=eq.${encodeURIComponent(
          email
        )}&limit=1000`,
      }
    ),
    supabaseRest<unknown[]>(
      "orders",
      {
        query: `select=*&customer_id=eq.${encodeURIComponent(
          customerId
        )}&limit=1000`,
      }
    ),
    supabaseRest<unknown[]>(
      "loyalty_wallets",
      {
        query: `select=*&customer_id=eq.${encodeURIComponent(
          customerId
        )}&limit=10`,
      }
    ),
    supabaseRest<unknown[]>(
      "crm_customer_profiles",
      {
        query: `select=*&customer_id=eq.${encodeURIComponent(
          customerId
        )}&limit=1`,
      }
    ),
    supabaseRest<unknown[]>(
      "crm_customer_tags",
      {
        query: `select=*&customer_id=eq.${encodeURIComponent(
          customerId
        )}&limit=100`,
      }
    ),
    supabaseRest<unknown[]>(
      "communication_preferences",
      {
        query: `select=*&customer_id=eq.${encodeURIComponent(
          customerId
        )}&limit=1`,
      }
    ),
    supabaseRest<unknown[]>(
      "notification_queue",
      {
        query: `select=id,channel,template_key,status,created_at,sent_at&customer_id=eq.${encodeURIComponent(
          customerId
        )}&limit=1000`,
      }
    ),
    supabaseRest<unknown[]>(
      "billing_receipts",
      {
        query: `select=id,receipt_number,entity_type,entity_id,amount,currency,issued_at&customer_email=eq.${encodeURIComponent(
          email
        )}&limit=1000`,
      }
    ),
  ]);

  return {
    exportedAt:
      new Date().toISOString(),
    customer,
    profile,
    reservations,
    orders,
    loyalty,
    crm,
    tags,
    communications,
    notifications,
    receipts,
    excluded: [
      "Authentication password hashes",
      "Session token hashes",
      "Internal security logs",
      "Provider secrets",
    ],
  };
}
