import { NextRequest } from "next/server";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { requireCustomer } from "@/lib/server/account/session";
import { supabaseRest } from "@/lib/server/supabase/http";

type ReservationHistoryRow = {
  id: string;
  guest_name: string;
  email: string;
  reservation_date: string;
  reservation_time: string;
  guest_count: number;
  area: string | null;
  table_id: string | null;
  status: string;
  created_at?: string;
};

export async function GET(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const customer = await requireCustomer(request);

    const rows = await supabaseRest<ReservationHistoryRow[]>(
      "reservations",
      {
        query: `select=*&email=eq.${encodeURIComponent(
          customer.email
        )}&order=reservation_date.desc&limit=100`,
      }
    );

    return apiSuccess({ reservations: rows }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
