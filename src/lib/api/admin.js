"use server";

import { protectedServerFetch, serverMutation } from "./core/server";

export const getAdminStats = async () =>
  protectedServerFetch("admin/dashboard/stats");

export const getAdminSettings = async () =>
  protectedServerFetch("admin/settings");

export const saveAdminSettings = async (settings) =>
  serverMutation("admin/settings", settings, "PUT");