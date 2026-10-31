"use server";

import { serverMutation } from "./server";

export const uploadImage = async (file, name) =>
  serverMutation("upload", { file, name });

export const resolveImageUrl = async (imageUrl) =>
  serverMutation("upload", { imageUrl });