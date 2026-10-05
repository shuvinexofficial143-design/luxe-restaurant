import AdminLoginForm from "@/components/auth/AdminLoginForm";

export const metadata = { title: "LUXE Admin Login" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next = "/admin" } = await searchParams;

  return (
    <main className="min-h-screen bg-[#201713] p-3 text-[#201713] md:p-6">
      <div className="mx-auto grid min-h-[94vh] max-w-[1080px] items-center gap-4 lg:grid-cols-[1fr_470px]">
        <div className="hidden rounded-[34px] bg-[#7c241e] p-8 text-white lg:block">
          <p className="text-[10px] uppercase tracking-[.16em] text-[#ffd0a8]">
            LUXE Control Room
          </p>
          <h2 className="lx-serif mt-3 text-7xl leading-[.9]">
            Restaurant operations, protected.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
            This batch introduces the protected-route and role-permission
            foundation before the real database authentication phase.
          </p>
        </div>

        <AdminLoginForm nextPath={next} />
      </div>
    </main>
  );
}
