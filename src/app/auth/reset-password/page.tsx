import AuthShell from "@/components/auth/AuthShell";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export const metadata = { title: "Choose New Password" };

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;

  return (
    <AuthShell
      title="Choose a new password."
      text="Successful reset revokes existing customer sessions before you sign in again."
    >
      <ResetPasswordForm token={token} />
    </AuthShell>
  );
}
