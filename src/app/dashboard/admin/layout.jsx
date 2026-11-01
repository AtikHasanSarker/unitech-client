import { requireAdmin } from "@/lib/session";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({ children }) {
  await requireAdmin();

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
