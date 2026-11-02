import { Suspense } from "react";
import { requireAdmin } from "@/lib/session";
import AdminLayoutClient from "./AdminLayoutClient";

export default function AdminLayout({ children }) {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          aria-label="Checking administrator access"
          className="min-h-screen bg-slate-50"
        />
      }
    >
      <AuthorizedAdminLayout>{children}</AuthorizedAdminLayout>
    </Suspense>
  );
}

async function AuthorizedAdminLayout({ children }) {
  await requireAdmin();

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
