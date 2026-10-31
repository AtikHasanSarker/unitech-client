"use server";

import { protectedServerFetch, serverMutation } from "./server";

export const getAdminStats = async () =>
  protectedServerFetch("admin/dashboard/stats");

export const getAdminSettings = async () =>
  protectedServerFetch("admin/settings");

export const saveAdminSettings = async (settings) =>
  serverMutation("admin/settings", settings, "PUT");