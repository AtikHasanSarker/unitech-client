import { getUserSession } from "@/lib/session";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function POST(request) {
  let user;

  try {
    user = await getUserSession();
  } catch {
    return Response.json(
      { success: false, message: "Could not verify the current session." },
      { status: 500 },
    );
  }

  if (!user) {
    return Response.json(
      { success: false, message: "Authentication is required to upload images." },
      { status: 401 },
    );
  }

  if (user.role !== "admin") {
    return Response.json(
      { success: false, message: "Administrator access is required." },
      { status: 403 },
    );
  }

  const apiKey = process.env.IMGBB_API_KEY;
  if (!apiKey) {
    return Response.json(
      { success: false, message: "Image upload is not configured." },
      { status: 500 },
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json(
      { success: false, message: "Expected a multipart image upload." },
      { status: 400 },
    );
  }

  const image = formData.get("image");
  if (!image || typeof image === "string") {
    return Response.json(
      { success: false, message: "An image file is required." },
      { status: 400 },
    );
  }

  if (!ALLOWED_IMAGE_TYPES.has(image.type.toLowerCase())) {
    return Response.json(
      {
        success: false,
        message: "Supported image formats are JPG, JPEG, PNG, WEBP, and GIF.",
      },
      { status: 415 },
    );
  }

  if (image.size > MAX_IMAGE_SIZE) {
    return Response.json(
      { success: false, message: "Image size must be 5 MB or less." },
      { status: 413 },
    );
  }

  const uploadData = new FormData();
  uploadData.append("image", image, image.name);
  const name = formData.get("name");
  if (typeof name === "string" && name.trim()) {
    uploadData.append("name", name.trim());
  }

  const uploadUrl = new URL("https://api.imgbb.com/1/upload");
  uploadUrl.searchParams.set("key", apiKey);

  try {
    const response = await fetch(uploadUrl, {
      method: "POST",
      body: uploadData,
      cache: "no-store",
    });
    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success || !result?.data?.url) {
      return Response.json(
        {
          success: false,
          message:
            result?.error?.message || "The image hosting service rejected the upload.",
        },
        { status: 502 },
      );
    }

    return Response.json({ success: true, data: { url: result.data.url } });
  } catch {
    return Response.json(
      { success: false, message: "Could not connect to the image hosting service." },
      { status: 502 },
    );
  }
}