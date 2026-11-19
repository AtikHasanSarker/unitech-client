"use server";

import { protectedServerFetch, serverMutation } from "./core/server";
import { requireAdmin } from "@/lib/session";

export const getAdminStats = async () => {
  await requireAdmin();
  return protectedServerFetch("admin/dashboard/stats");
};

export const getAdminSettings = async () => {
  await requireAdmin();
  return protectedServerFetch("admin/settings");
};

export const saveAdminSettings = async (settings) => {
  await requireAdmin();
  return serverMutation("admin/settings", settings, "PUT");
};