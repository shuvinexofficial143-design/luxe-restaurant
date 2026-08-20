import AdminShell from "@/components/admin/AdminShell";
import CMSApprovalQueue from "@/components/cms/CMSApprovalQueue";

export const metadata = { title: "CMS Approval Queue" };

export default function CMSApprovalsPage() {
  return (
    <AdminShell title="Approval Queue" eyebrow="CMS Workflow">
      <div className="mx-auto max-w-[900px]">
        <CMSApprovalQueue />
      </div>
    </AdminShell>
  );
}
