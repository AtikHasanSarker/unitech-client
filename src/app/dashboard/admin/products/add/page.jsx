"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ImagePlus,
  Package,
  DollarSign,
  Boxes,
  FileText,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  X,
  Plus,
  Trash2,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { addProduct } from "@/lib/api/product";
import { uploadImage as uploadImageAction } from "@/lib/api/upload";

const initialForm = {
  name: "",
  sku: "",
  category: "",
  brand: "",
  description: "",
  price: "",
  costPrice: "",
  discountPrice: "",
  stock: "",
  lowStockThreshold: "2",
  warranty: "",
};

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60";

const labelClass = "mb-2 block text-sm font-medium text-slate-700";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState(initialForm);
  const [features, setFeatures] = useState([""]);
  const [specifications, setSpecifications] = useState([
    { key: "", value: "" },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));

    if (message.text) {
      setMessage({ type: "", text: "" });
    }
  };

  const handleFeatureChange = (index, value) => {
    setFeatures((previous) =>
      previous.map((feature, i) => (i === index ? value : feature)),
    );
  };

  const addFeatureField = () => {
    setFeatures((previous) => [...previous, ""]);
  };

  const removeFeatureField = (index) => {
    setFeatures((previous) => previous.filter((_, i) => i !== index));
  };

  const handleSpecificationChange = (index, field, value) => {
    setSpecifications((previous) =>
      previous.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    );
  };

  const addSpecificationField = () => {
    setSpecifications((previous) => [...previous, { key: "", value: "" }]);
  };

  const removeSpecificationField = (index) => {
    setSpecifications((previous) => previous.filter((_, i) => i !== index));
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
        text: "Image size must be 5 MB or less.",
      });
      event.target.value = "";
      return;
    }

    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
    setMessage({ type: "", text: "" });
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview("");

    const input = document.getElementById("imageFile");
    if (input) input.value = "";
  };

  const resetForm = () => {
    setForm(initialForm);
    setFeatures([""]);
    setSpecifications([{ key: "", value: "" }]);
    setSelectedImage(null);
    setImagePreview("");
    setMessage({ type: "", text: "" });

    const input = document.getElementById("imageFile");
    if (input) input.value = "";
  };

  const uploadImage = async (file) => {
    const result = await uploadImageAction(file, file.name);

    if (!result?.success || !result?.data?.url) {
      throw new Error(
        result?.message || "Image upload failed. Please try again.",
      );
    }

    return result.data.url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) return;

    setMessage({ type: "", text: "" });

    const price = Number(form.price);
    const costPrice = form.costPrice === "" ? 0 : Number(form.costPrice);
    const discountPrice =
      form.discountPrice === "" ? null : Number(form.discountPrice);
    const stock = Number(form.stock);
    const lowStockThreshold = Number(form.lowStockThreshold);

    if (!form.name.trim()) {
      setMessage({ type: "error", text: "Product name is required." });
      return;
    }

    if (!form.sku.trim()) {
      setMessage({ type: "error", text: "SKU is required." });
      return;
    }

    if (!form.category.trim()) {
      setMessage({ type: "error", text: "Product category is required." });
      return;
    }

    if (form.price.trim() === "" || !Number.isFinite(price) || price < 0) {
      setMessage({
        type: "error",
        text: "Please enter a valid selling price.",
      });
      return;
    }

    if (
      form.costPrice !== "" &&
      (!Number.isFinite(costPrice) || costPrice < 0)
    ) {
      setMessage({
        type: "error",
        text: "Please enter a valid purchase price.",
      });
      return;
    }

    if (
      discountPrice !== null &&
      (!Number.isFinite(discountPrice) ||
        discountPrice < 0 ||
        discountPrice > price)
    ) {
      setMessage({
        type: "error",
        text: "Discount price must be valid and cannot exceed the selling price.",
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

    if (
      form.lowStockThreshold.trim() === "" ||
      !Number.isInteger(lowStockThreshold) ||
      lowStockThreshold < 0
    ) {
      setMessage({
        type: "error",
        text: "Low stock threshold must be a non-negative whole number.",
      });
      return;
    }

    const cleanedFeatures = features
      .map((feature) => feature.trim())
      .filter(Boolean);

    const cleanedSpecifications = specifications
      .map((item) => ({
        key: item.key.trim(),
        value: item.value.trim(),
      }))
      .filter((item) => item.key && item.value);

    setLoading(true);

    try {
      let imageUrl = "";

      if (selectedImage) {
        setImageUploading(true);
        imageUrl = await uploadImage(selectedImage);
        setImageUploading(false);
      }

      // Keep this payload aligned with AdminProductsPage and the Product model.
      const payload = {
        name: form.name.trim(),
        sku: form.sku.trim(),
        category: form.category.trim(),
        brand: form.brand.trim(),
        description: form.description.trim(),
        price,
        costPrice,
        discountPrice,
        stock,
        lowStockThreshold,
        features: cleanedFeatures,
        specifications: cleanedSpecifications,
        warranty: form.warranty.trim(),
        images: imageUrl ? [imageUrl] : [],
      };

      const result = await addProduct(payload);

      if (!result?.success) {
        throw new Error(result.message || "Failed to create product.");
      }

      toast.success("Product created successfully.");

      // Return to the product list after a successful create.
      resetForm();
      router.replace("/dashboard/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Create product error:", error);
      setMessage({
        type: "error",
        text: error?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
      setImageUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link
            href="/dashboard/admin/products"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to Products
          </Link>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
                <Link
                  href="/dashboard/admin"
                  className="transition hover:text-blue-600"
                >
                  Admin
                </Link>
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
                Add product information, pricing, inventory and specifications.
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

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Basic information */}
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
                      Enter the product identity and description.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className={labelClass}>
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Awei PA-92 20000mAh Power Bank"
                      required
                      maxLength={150}
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="sku" className={labelClass}>
                      SKU / Product Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="sku"
                      name="sku"
                      value={form.sku}
                      onChange={handleChange}
                      placeholder="e.g. AW-PA92-BLK"
                      required
                      maxLength={80}
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="brand" className={labelClass}>
                      Brand
                    </label>
                    <input
                      id="brand"
                      name="brand"
                      value={form.brand}
                      onChange={handleChange}
                      placeholder="e.g. Awei"
                      maxLength={100}
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="category" className={labelClass}>
                      Category <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="category"
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      placeholder="e.g. Power Bank"
                      required
                      maxLength={100}
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="description"
                      className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <FileText size={16} />
                      Product Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Write a detailed product description..."
                      rows={5}
                      maxLength={5000}
                      disabled={loading}
                      className={`${inputClass} resize-y`}
                    />
                    <p className="mt-2 text-right text-xs text-slate-400">
                      {form.description.length}/5000 characters
                    </p>
                  </div>
                </div>
              </section>

              {/* Features */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Product Features
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Add the key selling points shown with check marks.
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <CheckCircle2 size={20} />
                  </div>
                </div>

                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        value={feature}
                        onChange={(event) =>
                          handleFeatureChange(index, event.target.value)
                        }
                        placeholder={`Feature ${index + 1}, e.g. 20000mAh Capacity`}
                        disabled={loading}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeFeatureField(index)}
                        disabled={loading || features.length === 1}
                        aria-label="Remove feature"
                        className="rounded-xl border border-slate-200 p-3 text-slate-400 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addFeatureField}
                  disabled={loading}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
                >
                  <Plus size={16} />
                  Add Feature
                </button>
              </section>

              {/* Specifications */}
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      Specifications
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Add technical details as label and value pairs.
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <Settings2 size={20} />
                  </div>
                </div>

                <div className="space-y-3">
                  {specifications.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]"
                    >
                      <input
                        value={item.key}
                        onChange={(event) =>
                          handleSpecificationChange(
                            index,
                            "key",
                            event.target.value,
                          )
                        }
                        placeholder="e.g. Capacity"
                        disabled={loading}
                        className={inputClass}
                      />
                      <input
                        value={item.value}
                        onChange={(event) =>
                          handleSpecificationChange(
                            index,
                            "value",
                            event.target.value,
                          )
                        }
                        placeholder="e.g. 20000mAh"
                        disabled={loading}
                        className={inputClass}
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecificationField(index)}
                        disabled={loading || specifications.length === 1}
                        aria-label="Remove specification"
                        className="justify-self-end rounded-xl border border-slate-200 p-3 text-slate-400 transition hover:border-red-200 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 sm:justify-self-auto"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addSpecificationField}
                  disabled={loading}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 disabled:opacity-50"
                >
                  <Plus size={16} />
                  Add Specification
                </button>
              </section>

              {/* Pricing and inventory */}
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
                      Set purchase cost, selling price and stock quantity.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="costPrice" className={labelClass}>
                      Purchase Price (৳)
                    </label>
                    <input
                      id="costPrice"
                      name="costPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.costPrice}
                      onChange={handleChange}
                      placeholder="e.g. 450"
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className={labelClass}>
                      Selling Price (৳) <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="e.g. 650"
                      required
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="discountPrice" className={labelClass}>
                      Discount Price (৳)
                    </label>
                    <input
                      id="discountPrice"
                      name="discountPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.discountPrice}
                      onChange={handleChange}
                      placeholder="Optional"
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label htmlFor="stock" className={labelClass}>
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
                        placeholder="e.g. 25"
                        required
                        disabled={loading}
                        className={`${inputClass} pl-11`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lowStockThreshold" className={labelClass}>
                      Low Stock Alert
                    </label>
                    <input
                      id="lowStockThreshold"
                      name="lowStockThreshold"
                      type="number"
                      min="0"
                      step="1"
                      value={form.lowStockThreshold}
                      onChange={handleChange}
                      placeholder="5"
                      disabled={loading}
                      className={inputClass}
                    />
                    <p className="mt-1 text-xs text-slate-400">
                      Alert when stock reaches this quantity.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="warranty" className={labelClass}>
                      Warranty
                    </label>
                    <input
                      id="warranty"
                      name="warranty"
                      value={form.warranty}
                      onChange={handleChange}
                      placeholder="e.g. 6 Months / No Warranty"
                      disabled={loading}
                      className={inputClass}
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-5">
                  <h2 className="font-semibold text-slate-900">
                    Product Image
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Select an image from your computer.
                  </p>
                </div>

                <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">
                  {imagePreview ? (
                    <div className="relative flex h-full w-full items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imagePreview}
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

                <label htmlFor="imageFile" className={labelClass}>
                  Upload Image
                </label>
                <input
                  id="imageFile"
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.gif,image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:font-medium file:text-blue-600 disabled:opacity-60"
                />
                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Supported formats: JPG, JPEG, PNG, WEBP, GIF. Maximum size: 5
                  MB.
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
                      Verify the SKU, category, purchase price, selling price,
                      stock and product details before adding the product.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </div>

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

          <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}
              className="rounded-xl border cursor-pointer border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset Form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
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
