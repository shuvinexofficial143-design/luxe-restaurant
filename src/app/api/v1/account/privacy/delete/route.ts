import { NextRequest } from "next/server";
import {
  apiFailure,
  apiSuccess,
} from "@/lib/server/api/response";
import {
  getRequestId,
} from "@/lib/server/security/request-id";
import {
  requireCustomer,
} from "@/lib/server/account/session";
import {
  parseJsonObject,
} from "@/lib/server/api/validation";
import {
  createPrivacyRequest,
} from "@/lib/server/privacy/service";

export async function POST(
  request: NextRequest
) {
  const requestId =
    getRequestId(request);

  try {
    const customer =
      await requireCustomer(
        request
      );

    const body =
      await parseJsonObject(
        request
      );

    const requestRow =
      await createPrivacyRequest({
        customerId:
          customer.id,
        type: "DELETE",
        note:
          typeof body.note ===
          "string"
            ? body.note.slice(
                0,
                1000
              )
            : "Customer requested account deletion review.",
      });

    return apiSuccess(
      {
        request: requestRow,
        deletionPerformed:
          false,
        message:
          "Deletion request was recorded for review. Data was not automatically erased.",
      },
      requestId,
      201
    );
  } catch (error) {
    return apiFailure(
      error,
      requestId
    );
  }
}
