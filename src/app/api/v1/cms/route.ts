import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseCMS } from "@/lib/server/supabase/cms";

export async function GET(request: Request) {
  const requestId = getRequestId(request);
  const url = new URL(request.url);
  const collection = url.searchParams.get("collection") || "menu";

  try {
    const rows = await supabaseCMS.listPublished(collection);
    return apiSuccess({ collection, items: rows }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
