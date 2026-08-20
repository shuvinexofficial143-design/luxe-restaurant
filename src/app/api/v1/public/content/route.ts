import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { normalizeLocale } from "@/lib/i18n/config";
import { getPublishedCollection } from "@/lib/public-content/service";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const url = new URL(request.url);
    const collection = url.searchParams.get("collection") || "menu";
    const locale = normalizeLocale(url.searchParams.get("locale"));
    const data = await getPublishedCollection(collection, locale, 100);

    return apiSuccess(data, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
