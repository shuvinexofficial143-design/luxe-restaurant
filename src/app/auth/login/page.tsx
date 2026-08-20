import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import CustomerLoginForm from "@/components/auth/CustomerLoginForm";

export const metadata = { title: "LUXE Account Login" };

export default async function CustomerLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next = "/account/secure" } = await searchParams;

  return (
    <AuthShell
      title="Return to your table."
      text="Sign in using a database-backed customer identity and revocable server session."
    >
      <div>
        <CustomerLoginForm nextPath={next} />
        <div className="mt-3 flex justify-between gap-3 text-[10px] text-white/55">
          <Link href="/auth/register" className="text-[#efc28b]">
            Create account
          </Link>
          <Link href="/auth/forgot-password" className="text-[#efc28b]">
            Forgot password?
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
