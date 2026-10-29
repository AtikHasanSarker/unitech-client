"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  Package,
  DollarSign,
  Boxes,
  Tag,
  FileText,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";
import { addProduct } from "@/lib/api/product";

const initialForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  image: "",
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export default function AddProductPage() {
  const [form, setForm] = useState(initialForm);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setMessage({
        type: "error",
        text: "Please select a JPG, PNG, WEBP, or GIF image.",
      });

      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setMessage({
        type: "error",
        text: "Image size must be 2 MB or less.",
      });

      event.target.value = "";
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));

    setForm((previous) => ({
      ...previous,
      image: "",
    }));

    setMessage({ type: "", text: "" });
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview("");

    setForm((previous) => ({
      ...previous,
      image: "",
    }));

    const input = document.getElementById("imageFile");

    if (input) {
      input.value = "";
    }

    setMessage({ type: "", text: "" });
  };

  const resetForm = () => {
    setForm(initialForm);
    setSelectedImage(null);
    setImagePreview("");
    setMessage({ type: "", text: "" });

    const input = document.getElementById("imageFile");

    if (input) {
      input.value = "";
    }
  };

  const uploadImage = async (file) => {
    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to read the selected image."));
        }
      };

      reader.onerror = () => {
        reject(new Error("Failed to read the selected image."));
      };

      reader.readAsDataURL(file);
    });

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    if (!serverUrl) {
      throw new Error(
        "Server URL is not configured. Check NEXT_PUBLIC_SERVER_URL.",
      );
    }

    const response = await fetch(
      `${serverUrl.replace(/\/+$/, "")}/api/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          file: base64Image,
          name: file.name,
        }),
      },
    );

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success || !result?.data?.url) {
      throw new Error(
        result?.message || "Image upload failed. Please try again.",
      );
    }

    return result.data.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage({ type: "", text: "" });

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!form.name.trim()) {
      setMessage({
        type: "error",
        text: "Product name is required.",
      });
      return;
    }

    if (!form.category.trim()) {
      setMessage({
        type: "error",
        text: "Product category is required.",
      });
      return;
    }

    if (form.price.trim() === "" || !Number.isFinite(price) || price < 0) {
      setMessage({
        type: "error",
        text: "Please enter a valid product price.",
      });
      return;
    }

    if (form.stock.trim() === "" || !Number.isInteger(stock) || stock < 0) {
      setMessage({
        type: "error",
        text: "Stock must be a non-negative whole number.",
      });
      return;
    }

    setLoading(true);

    try {
      let imageUrl = form.image.trim();

      // Step 1: Upload the selected image to ImgBB through the backend.
      if (selectedImage) {
        setImageUploading(true);

        imageUrl = await uploadImage(selectedImage);

        setImageUploading(false);
      }

      // Step 2: Create the product using the returned image URL.
      const result = await addProduct({
        name: form.name.trim(),
        description: form.description.trim(),
        price,
        category: form.category.trim(),
        stock,
        image: imageUrl,
      });

      if (result?.success === false) {
        throw new Error(result.message || "Failed to create product.");
      }

      setMessage({
        type: "success",
        text: "Product created successfully!",
      });

      setForm(initialForm);
      setSelectedImage(null);
      setImagePreview("");

      const input = document.getElementById("imageFile");

      if (input) {
        input.value = "";
      }
    } catch (error) {
      console.error("Create product error:", error);

      setMessage({
        type: "error",
        text: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
      setImageUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard/admin"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Dashboard
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <span>Admin</span>
                <span>/</span>

                <Link
                  href="/dashboard/admin/products"
                  className="transition hover:text-blue-600"
                >
                  Products
                </Link>

                <span>/</span>
                <span className="text-blue-600">Add Product</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Add New Product
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Add a new product to your store inventory.
              </p>
            </div>

            <Link
              href="/dashboard/admin/products"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              <Package size={17} />
              View Products
            </Link>
          </div>
        </div>

        {/* Product Form */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Main Form */}
            <div className="space-y-6 lg:col-span-2">
              {/* Basic Information */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Package size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Enter the product details.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Product Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Product Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Wireless Headphones"
                      required
                      maxLength={150}
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <FileText size={16} />
                      Description
                    </label>

                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Describe the product, its features and benefits..."
                      rows={5}
                      maxLength={5000}
                      disabled={loading}
                      className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                    />

                    <p className="mt-2 text-right text-xs text-slate-400">
                      {form.description.length}/5000 characters
                    </p>
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <Tag size={16} />
                      Category <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="category"
                      name="category"
                      type="text"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="e.g. Electronics"
                      required
                      maxLength={100}
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                    />
                  </div>
                </div>
              </section>

              {/* Pricing and Inventory */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <DollarSign size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Pricing & Inventory
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Set the price and available stock.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Price (৳) <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                        ৳
                      </span>

                      <input
                        id="price"
                        name="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="0.00"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label
                      htmlFor="stock"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Stock Quantity <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <Boxes
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      />

                      <input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        step="1"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="0"
                        required
                        disabled={loading}
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Product Image */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="font-semibold text-slate-900">
                    Product Image
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Select an image from your computer.
                  </p>
                </div>

                {/* Image Preview */}
                <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
                  {imagePreview || form.image.trim() ? (
                    <div className="relative flex h-full w-full items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview || form.image}
                        alt={form.name || "Product preview"}
                        className="h-full w-full object-contain p-4"
                      />

                      <button
                        type="button"
                        onClick={removeImage}
                        disabled={loading}
                        aria-label="Remove product image"
                        className="absolute right-3 top-3 rounded-lg bg-white p-2 text-slate-500 shadow-sm transition hover:text-red-600 disabled:opacity-50"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="px-4 text-center">
                      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <ImagePlus size={26} />
                      </div>

                      <p className="text-sm font-medium text-slate-700">
                        No image selected
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Select an image to see the preview.
                      </p>
                    </div>
                  )}
                </div>

                {/* File Input */}
                <label
                  htmlFor="imageFile"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Upload Image
                </label>

                <input
                  id="imageFile"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-medium file:text-blue-600 disabled:opacity-60"
                />

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Supported formats: JPG, PNG, WEBP, GIF. Maximum size: 2 MB.
                </p>

                {selectedImage && (
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <p className="truncate text-sm text-slate-600">
                      {selectedImage.name}
                    </p>

                    <button
                      type="button"
                      onClick={removeImage}
                      disabled={loading}
                      className="shrink-0 text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </section>

              {/* Form Notice */}
              <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5 text-blue-600">
                    <AlertCircle size={19} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-800">
                      Before publishing
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Check the product name, category, price and stock quantity
                      before adding it to your store.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* Feedback */}
          {message.text && (
            <div
              role="status"
              aria-live="polite"
              className={`mt-6 flex items-start gap-3 rounded-xl border p-4 text-sm ${
                message.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              ) : (
                <AlertCircle size={19} className="mt-0.5 shrink-0" />
              )}

              <p>{message.text}</p>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset Form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  {imageUploading
                    ? "Uploading Image..."
                    : "Creating Product..."}
                </>
              ) : (
                <>
                  <Package size={18} />
                  Add Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
