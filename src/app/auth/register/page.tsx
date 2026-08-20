import Link from "next/link";
import AuthShell from "@/components/auth/AuthShell";
import CustomerRegisterForm from "@/components/auth/CustomerRegisterForm";

export const metadata = { title: "Create LUXE Account" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="A better guest experience starts here."
      text="Secure customer accounts are stored in PostgreSQL/Supabase when the database is connected."
    >
      <div>
        <CustomerRegisterForm />
        <p className="mt-3 text-center text-[10px] text-white/55">
          Already registered?{" "}
          <Link href="/auth/login" className="text-[#efc28b]">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
