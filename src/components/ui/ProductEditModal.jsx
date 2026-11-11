"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  X,
  Package,
  Settings2,
  CheckCircle2,
  CircleDollarSign,
  Image as ImageIcon,
  Plus,
  Trash2,
} from "lucide-react";
import { updateProduct } from "@/lib/api/product";

const EMPTY_FORM = {
  name: "",
  sku: "",
  category: "",
  brand: "",
  description: "",
  price: "",
  costPrice: "",
  discountPrice: "",
  stock: "",
  lowStockThreshold: "5",
  warranty: "",
  status: "active",
  image: "",
  features: [""],
  specifications: [{ key: "", value: "" }],
};

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 disabled:cursor-not-allowed disabled:opacity-60";

function FormField({ label, children }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}

function SectionHeading({ icon, title }) {
  return (
    <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
      <span className="text-blue-600">{icon}</span>
      <h3 className="font-semibold text-slate-900">{title}</h3>
    </div>
  );
}

function normalizeStatus(status) {
  const value = String(status || "active").toLowerCase();
  if (value === "draft" || value === "inactive") return "draft";
  return "active";
}

function initializeForm(product) {
  if (!product) return EMPTY_FORM;

  return {
    name: product.name || "",
    sku: product.sku || "",
    category: product.category || "",
    brand: product.brand || "",
    description: product.description || "",
    price: String(product.price ?? ""),
    costPrice:
      product.costPrice === null || product.costPrice === undefined
        ? ""
        : String(product.costPrice),
    discountPrice:
      product.discountPrice === null || product.discountPrice === undefined
        ? ""
        : String(product.discountPrice),
    stock: String(product.stock ?? 0),
    lowStockThreshold: String(product.lowStockThreshold ?? 5),
    warranty: product.warranty || "",
    status: normalizeStatus(product.status),
    image: product.images?.[0] || product.image || "",
    features: product.features?.length > 0 ? [...product.features] : [""],
    specifications:
      product.specifications?.length > 0
        ? product.specifications.map((item) => ({
            key: item.key || "",
            value: item.value || "",
          }))
        : [{ key: "", value: "" }],
  };
}

export default function ProductEditModal({
  product,
  categories = [],
  products = [],
  onClose,
  onUpdateSuccess,
}) {
  const [form, setForm] = useState(() => initializeForm(product));
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  function handleClose() {
    if (isSaving) return;
    setFormError("");
    onClose?.();
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (formError) setFormError("");
  }

  function handleFeatureChange(index, value) {
    setForm((current) => ({
      ...current,
      features: current.features.map((item, i) =>
        i === index ? value : item,
      ),
    }));
  }

  function addFeatureField() {
    setForm((current) => ({
      ...current,
      features: [...current.features, ""],
    }));
  }

  function removeFeatureField(index) {
    setForm((current) => ({
      ...current,
      features: current.features.filter((_, i) => i !== index),
    }));
  }

  function handleSpecificationChange(index, field, value) {
    setForm((current) => ({
      ...current,
      specifications: current.specifications.map((item, i) =>
        i === index ? { ...item, [field]: value } : item,
      ),
    }));
  }

  function addSpecificationField() {
    setForm((current) => ({
      ...current,
      specifications: [...current.specifications, { key: "", value: "" }],
    }));
  }

  function removeSpecificationField(index) {
    setForm((current) => ({
      ...current,
      specifications: current.specifications.filter((_, i) => i !== index),
    }));
  }

  async function handleUpdate(event) {
    event.preventDefault();
    if (!product) return;

    const productId = product.id || product._id;
    const name = form.name.trim();
    const sku = form.sku.trim();
    const price = Number(form.price);
    const costPrice = form.costPrice === "" ? 0 : Number(form.costPrice);
    const discountPrice =
      form.discountPrice === "" ? null : Number(form.discountPrice);
    const stock = Number(form.stock);
    const lowStockThreshold = Number(form.lowStockThreshold);

    if (!name || !sku || !form.category.trim()) {
      setFormError("Product name, SKU and category are required.");
      return;
    }

    if (form.price.trim() === "" || !Number.isFinite(price) || price < 0) {
      setFormError("Selling price must be a valid non-negative number.");
      return;
    }

    if (!Number.isFinite(costPrice) || costPrice < 0) {
      setFormError("Purchase price must be a valid non-negative number.");
      return;
    }

    if (
      discountPrice !== null &&
      (!Number.isFinite(discountPrice) ||
        discountPrice < 0 ||
        discountPrice > price)
    ) {
      setFormError("Discount price cannot exceed the selling price.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setFormError("Stock must be a non-negative whole number.");
      return;
    }

    if (!Number.isInteger(lowStockThreshold) || lowStockThreshold < 0) {
      setFormError("Low stock alert must be a non-negative whole number.");
      return;
    }

    const duplicateSku = products.some(
      (item) =>
        String(item.sku).toLowerCase() === sku.toLowerCase() &&
        (item.id || item._id) !== productId,
    );

    if (duplicateSku) {
      setFormError("A product with this SKU already exists.");
      return;
    }

    const cleanedFeatures = form.features
      .map((feature) => feature.trim())
      .filter(Boolean);

    const cleanedSpecifications = form.specifications
      .map((item) => ({
        key: item.key.trim(),
        value: item.value.trim(),
      }))
      .filter((item) => item.key && item.value);

    const productData = {
      name,
      sku,
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
      status: form.status === "draft" ? "Draft" : "Active",
      images: form.image.trim() ? [form.image.trim()] : [],
    };

    setIsSaving(true);
    setFormError("");

    try {
      const result = await updateProduct(productId, productData);

      if (!result?.success) {
        setFormError(result?.message || "Could not update product.");
        toast.error(result?.message || "Could not update product.");
        return;
      }

      toast.success("Product updated successfully!");

      const updatedPayload = result.data || {
        ...product,
        ...productData,
        _id: productId,
        id: productId,
      };

      if (onUpdateSuccess) {
        onUpdateSuccess(updatedPayload);
      }

      handleClose();
    } catch (error) {
      setFormError(error?.message || "Could not update product.");
      toast.error(error?.message || "Could not update product.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-product-modal-title"
        className="my-auto max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2
              id="edit-product-modal-title"
              className="text-lg font-bold text-slate-900"
            >
              Edit Product
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update product information, pricing and inventory.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSaving}
            aria-label="Close edit modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleUpdate}>
          <div className="max-h-[calc(85vh-145px)] space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
            <section>
              <SectionHeading
                icon={<Package size={18} />}
                title="Basic Information"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Product Name *">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    required
                    maxLength={150}
                    className={inputClass}
                  />
                </FormField>
                <FormField label="SKU *">
                  <input
                    name="sku"
                    value={form.sku}
                    onChange={handleFormChange}
                    required
                    maxLength={80}
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Category *">
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    required
                    maxLength={100}
                    list="product-category-options"
                    className={inputClass}
                  />
                  <datalist id="product-category-options">
                    {categories.map((item) => {
                      const categoryValue =
                        typeof item === "string" ? item : item.name;
                      return (
                        <option key={categoryValue} value={categoryValue} />
                      );
                    })}
                  </datalist>
                </FormField>
                <FormField label="Brand">
                  <input
                    name="brand"
                    value={form.brand}
                    onChange={handleFormChange}
                    maxLength={100}
                    className={inputClass}
                  />
                </FormField>
                <div className="sm:col-span-2">
                  <FormField label="Description">
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleFormChange}
                      rows={4}
                      maxLength={5000}
                      className={`${inputClass} resize-y`}
                    />
                    <p className="mt-1 text-right text-xs text-slate-400">
                      {form.description.length}/5000 characters
                    </p>
                  </FormField>
                </div>
              </div>
            </section>

            <section>
              <SectionHeading
                icon={<CheckCircle2 size={18} />}
                title="Product Features"
              />
              <div className="space-y-2">
                {form.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      value={feature}
                      onChange={(event) =>
                        handleFeatureChange(index, event.target.value)
                      }
                      placeholder={`Feature ${index + 1}`}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removeFeatureField(index)}
                      disabled={form.features.length === 1}
                      aria-label="Remove feature"
                      className="rounded-xl border border-slate-200 px-3 text-slate-400 hover:border-red-200 hover:text-red-600 disabled:opacity-40"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addFeatureField}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                <Plus size={15} />
                Add Feature
              </button>
            </section>

            <section>
              <SectionHeading
                icon={<Settings2 size={18} />}
                title="Specifications"
              />
              <div className="space-y-2">
                {form.specifications.map((item, index) => (
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
                      placeholder="Specification name (e.g. Capacity)"
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
                      placeholder="Value (e.g. 20000mAh)"
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecificationField(index)}
                      disabled={form.specifications.length === 1}
                      aria-label="Remove specification"
                      className="justify-self-end rounded-xl border border-slate-200 px-3 text-slate-400 hover:border-red-200 hover:text-red-600 disabled:opacity-40 sm:justify-self-auto"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addSpecificationField}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
              >
                <Plus size={15} />
                Add Specification
              </button>
            </section>

            <section>
              <SectionHeading
                icon={<CircleDollarSign size={18} />}
                title="Pricing & Inventory"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Purchase Price (৳)">
                  <input
                    name="costPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.costPrice}
                    onChange={handleFormChange}
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Selling Price (৳) *">
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={handleFormChange}
                    required
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Discount Price (৳)">
                  <input
                    name="discountPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.discountPrice}
                    onChange={handleFormChange}
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Stock Quantity *">
                  <input
                    name="stock"
                    type="number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={handleFormChange}
                    required
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Low Stock Alert">
                  <input
                    name="lowStockThreshold"
                    type="number"
                    min="0"
                    step="1"
                    value={form.lowStockThreshold}
                    onChange={handleFormChange}
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Warranty">
                  <input
                    name="warranty"
                    value={form.warranty}
                    onChange={handleFormChange}
                    placeholder="e.g. 6 Months / No Warranty"
                    className={inputClass}
                  />
                </FormField>
              </div>
            </section>

            <section>
              <SectionHeading
                icon={<ImageIcon size={18} />}
                title="Product Image & Status"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField label="Image URL">
                  <input
                    name="image"
                    type="url"
                    value={form.image}
                    onChange={handleFormChange}
                    placeholder="https://example.com/product.jpg"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Product Status">
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                    className={inputClass}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </FormField>
              </div>
            </section>

            {formError && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {formError}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-3 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSaving}
              className="rounded-xl border cursor-pointer border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-xl bg-blue-600 cursor-pointer px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
