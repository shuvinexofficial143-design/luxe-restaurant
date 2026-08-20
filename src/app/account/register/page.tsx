import LuxeShell from "@/components/luxe/LuxeShell";
import AuthCard from "@/components/account/AuthCard";
import RegisterForm from "@/components/account/RegisterForm";

export const metadata = { title: "Join LUXE" };

export default function RegisterPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[620px]">
          <AuthCard
            eyebrow="LUXE membership"
            title="Join"
            text="Create a demo guest profile and start with 250 welcome points."
          >
            <RegisterForm />
          </AuthCard>
        </div>
      </section>
    </LuxeShell>
  );
}
