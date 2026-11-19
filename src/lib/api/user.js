"use server";

import { protectedServerFetch, serverMutation } from "./core/server";
import { requireAdmin } from "@/lib/session";

export const getUsers = async () => {
  await requireAdmin();
  return protectedServerFetch("users");
};

export const getUserById = async (userId) => {
  await requireAdmin();
  return protectedServerFetch(`users/${userId}`);
};

export const updateUserRole = async (userId, role) => {
  await requireAdmin();
  return serverMutation(`users/${userId}/role`, { role }, "PATCH");
};

export const updateUserStatus = async (userId, status) => {
  await requireAdmin();
  return serverMutation(`users/${userId}/status`, { status }, "PATCH");
};