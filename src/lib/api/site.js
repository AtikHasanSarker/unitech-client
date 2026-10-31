"use server";

import { serverMutation } from "./server";

export const submitContactMessage = async (message) =>
  serverMutation("contact", message);

export const subscribeToNewsletter = async (email) =>
  serverMutation("newsletter", { email });
