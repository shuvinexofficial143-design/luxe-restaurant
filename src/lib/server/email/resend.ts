import { ApiError } from "@/lib/server/api/errors";

type ResendResult = {
  id: string;
};

export async function sendResendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  const apiKey =
    process.env.RESEND_API_KEY || "";
  const from =
    process.env.LUXE_EMAIL_FROM || "";

  if (!apiKey || !from) {
    throw new ApiError(
      "EMAIL_PROVIDER_NOT_CONFIGURED",
      "Resend email provider is not configured.",
      503
    );
  }

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
      }),
      cache: "no-store",
    }
  );

  const payload = (await response.json()) as
    | ResendResult
    | {
        message?: string;
        error?: {
          message?: string;
        };
      };

  if (
    !response.ok ||
    !("id" in payload)
  ) {
    throw new ApiError(
      "EMAIL_SEND_FAILED",
      "Email provider rejected the message.",
      response.status >= 500 ? 503 : 422,
      payload
    );
  }

  return payload;
}
