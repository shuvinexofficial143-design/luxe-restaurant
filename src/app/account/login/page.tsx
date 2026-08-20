import LuxeShell from "@/components/luxe/LuxeShell";
import AuthCard from "@/components/account/AuthCard";
import LoginForm from "@/components/account/LoginForm";

export const metadata = { title: "LUXE Login" };

export default function LoginPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[620px]">
          <AuthCard
            eyebrow="Welcome back"
            title="Login"
            text="Open your saved LUXE profile, favourites and loyalty experience."
          >
            <LoginForm />
          </AuthCard>
        </div>
      </section>
    </LuxeShell>
  );
}
