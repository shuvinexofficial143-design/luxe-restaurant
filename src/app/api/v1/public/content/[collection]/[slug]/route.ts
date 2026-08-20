import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { normalizeLocale } from "@/lib/i18n/config";
import { getPublishedContentItem } from "@/lib/public-content/service";
import { ApiError } from "@/lib/server/api/errors";

export async function GET(
  request: Request,
  context: { params: Promise<{ collection: string; slug: string }> }
) {
  const requestId = getRequestId(request);

  try {
    const { collection, slug } = await context.params;
    const locale = normalizeLocale(
      new URL(request.url).searchParams.get("locale")
    );
    const item = await getPublishedContentItem(
      collection,
      slug,
      locale
    );

    if (!item) {
      throw new ApiError(
        "PUBLIC_CONTENT_NOT_FOUND",
        "Published content was not found.",
        404
      );
    }

    return apiSuccess({ item }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
