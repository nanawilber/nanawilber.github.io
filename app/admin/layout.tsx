import AdminNav from "@/components/admin/AdminNav";
import { requireAuth } from "@/lib/proxy";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="flex-1 p-8 bg-background">{children}</main>
    </div>
  );
}
