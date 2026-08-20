import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import { getRequestId } from "@/lib/server/security/request-id";
import { supabaseCMS } from "@/lib/server/supabase/cms";

export async function GET(request: Request) {
  const requestId = getRequestId(request);

  try {
    const menu = await supabaseCMS.listPublished("menu");

    const orderable = menu
      .filter((item) => typeof item.price === "number" && Number(item.price) > 0)
      .map((item) => ({
        slug: item.slug,
        title: item.title,
        excerpt: item.excerpt,
        image: item.image_url,
        category: item.category,
        price: Number(item.price),
      }));

    return apiSuccess({ menu: orderable }, requestId);
  } catch (error) {
    return apiFailure(error, requestId);
  }
}
