import { serverMutation } from "./core/server";

export const uploadImage = async (file, name) => {
  const formData = new FormData();
  formData.append("image", file, file.name);
  if (name) formData.append("name", name);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  const result = await response.json().catch(() => ({
    success: false,
    message: "The server returned an invalid response.",
  }));

  return response.ok ? result : { ...result, success: false };
};

export const resolveImageUrl = async (imageUrl) =>
  serverMutation("upload", { imageUrl });