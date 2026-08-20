import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = { title: "Reset LUXE Password" };

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Recover access without weakening security."
      text="Reset tokens are random, stored only as hashes and expire after 30 minutes."
    >
      <div>
        <ForgotPasswordForm />
        <p className="mt-3 text-center text-[10px] text-white/55">
          <Link href="/auth/login" className="text-[#efc28b]">
            Back to sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
