import LuxeShell from "@/components/luxe/LuxeShell";
import NewsletterHero from "@/components/notifications/NewsletterHero";
import EmailCaptureForm from "@/components/notifications/EmailCaptureForm";
import DigestPreview from "@/components/notifications/DigestPreview";
import NotificationPreferences from "@/components/notifications/NotificationPreferences";

export const metadata = { title: "LUXE Newsletter" };

export default function NewsletterPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1080px]">
          <NewsletterHero />

          <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_350px]">
            <EmailCaptureForm />
            <NotificationPreferences />
          </div>

          <div className="mt-5">
            <DigestPreview />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}
