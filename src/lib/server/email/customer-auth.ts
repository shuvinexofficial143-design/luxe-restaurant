function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function passwordResetEmail(input: {
  name: string;
  resetUrl: string;
}) {
  const safeName = escapeHtml(input.name);
  const safeUrl = escapeHtml(input.resetUrl);

  return {
    subject: "Reset your LUXE password",
    text: `Hello ${input.name}. Reset your LUXE password using this link: ${input.resetUrl}. This link expires in 30 minutes.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:auto;padding:32px;background:#fffaf4;color:#201713">
        <p style="letter-spacing:.12em;text-transform:uppercase;font-size:11px;color:#7c241e">LUXE Account</p>
        <h1 style="font-size:38px;margin:12px 0">Reset your password.</h1>
        <p>Hello ${safeName},</p>
        <p>This secure reset link expires in 30 minutes.</p>
        <p style="margin:28px 0">
          <a href="${safeUrl}" style="background:#7c241e;color:white;text-decoration:none;padding:14px 20px;border-radius:999px">Reset password</a>
        </p>
        <p style="font-size:12px;color:#75645d">If you did not request this, you can ignore the email.</p>
      </div>
    `,
  };
}
