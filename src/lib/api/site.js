"use server";

import { serverMutation } from "./core/server";

export const submitContactMessage = async (message) =>
  serverMutation("contact", message);

export const subscribeToNewsletter = async (email) =>
  serverMutation("newsletter", { email });
