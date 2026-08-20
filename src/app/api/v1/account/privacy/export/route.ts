import {
  NextRequest,
  NextResponse,
} from "next/server";
import {
  requireCustomer,
} from "@/lib/server/account/session";
import {
  exportCustomerData,
} from "@/lib/server/privacy/export";
import {
  createPrivacyRequest,
} from "@/lib/server/privacy/service";

export async function GET(
  request: NextRequest
) {
  const customer =
    await requireCustomer(request);

  const data =
    await exportCustomerData(
      customer.id,
      customer.email
    );

  await createPrivacyRequest({
    customerId:
      customer.id,
    type: "EXPORT",
    note:
      "Self-service account export generated.",
  }).catch(
    () => undefined
  );

  return new NextResponse(
    JSON.stringify(
      data,
      null,
      2
    ),
    {
      status: 200,
      headers: {
        "Content-Type":
          "application/json; charset=utf-8",
        "Content-Disposition":
          `attachment; filename="luxe-my-data-${new Date()
            .toISOString()
            .slice(
              0,
              10
            )}.json"`,
        "Cache-Control":
          "no-store",
      },
    }
  );
}
