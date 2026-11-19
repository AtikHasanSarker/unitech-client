import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user;
};

export const getUserToken = async () => {
  const result = await auth.api.getToken({
    headers: await headers(),
  });
  return result?.token || null;
};

export async function requireAdmin() {
  const user = await getUserSession();
  const allowedAdminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!user) {
    redirect("/dashboard/login");
  }

  if (
    !allowedAdminEmail ||
    user.role !== "admin" ||
    user.email?.trim().toLowerCase() !== allowedAdminEmail
  ) {
    redirect("/");
  }
}
