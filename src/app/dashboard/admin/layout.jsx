import { getUserToken, requireAdmin } from "@/lib/session";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({ children }) {
  await requireAdmin();
  const token = await getUserToken();
  console.log("token:", token)

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
