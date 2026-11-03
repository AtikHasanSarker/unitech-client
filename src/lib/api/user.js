"use server";

import { protectedServerFetch, serverMutation } from "./core/server";

export const getUsers = async () => protectedServerFetch("users");

export const getUserById = async (userId) =>
  protectedServerFetch(`users/${userId}`);

export const updateUserRole = async (userId, role) =>
  serverMutation(`users/${userId}/role`, { role }, "PATCH");

export const updateUserStatus = async (userId, status) =>
  serverMutation(`users/${userId}/status`, { status }, "PATCH");