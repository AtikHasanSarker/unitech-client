"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  SlidersHorizontal,
  Pencil,
  Trash2,
  Package,
  Boxes,
  CircleDollarSign,
  AlertTriangle,
  X,
  Image as ImageIcon,
  ChevronDown,
  Settings2,
  CheckCircle2,
} from "lucide-react";
import { getCategories } from "@/lib/api/category";
import { deleteProduct, getProducts, updateProduct } from "@/lib/api/product";

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

function normalizeStatus(status) {
  const value = String(status || "active").toLowerCase();
  if (value === "inactive") return "inactive";
  if (value === "draft") return "draft";
  return "active";
}

function normalizeProduct(product) {
  const images = Array.isArray(product.images) ? product.images : [];
  return {
    ...product,
    id: product._id || product.id,
    sku: product.sku || product._id || product.id || "",
    price: Number(product.price) || 0,
    costPrice: Number(product.costPrice) || 0,
    discountPrice:
      product.discountPrice === null || product.discountPrice === undefined
        ? null
        : Number(product.discountPrice),
    stock: Number(product.stock) || 0,
    lowStockThreshold:
      Number.isFinite(Number(product.lowStockThreshold)) &&
      product.lowStockThreshold !== "" &&
      product.lowStockThreshold !== null
        ? Number(product.lowStockThreshold)
        : 5,
    status: normalizeStatus(product.status),
    images,
    image: images[0] || product.image || "",
    features: Array.isArray(product.features) ? product.features : [],
    specifications: Array.isArray(product.specifications)
      ? product.specifications
      : [],
  };
}

function formatPrice(value) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function getStockLabel(stock, threshold = 5) {
  if (stock <= 0) return "Out of stock";
  if (stock <= threshold) return "Low stock";
  return "In stock";
}

function getStockClasses(stock, threshold = 5) {
  if (stock <= 0) return "bg-red-50 text-red-700 ring-red-600/20";
  if (stock <= threshold) return "bg-amber-50 text-amber-700 ring-amber-600/20";
  return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
}

export default function AdminProductsPage() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadData() {
      setIsLoading(true);
      setLoadError("");

      const [productResponse, categoryResponse] = await Promise.allSettled([
        getProducts({ page: 1, limit: 100 }),
        getCategories(),
      ]);

      if (!active) return;

      if (
        productResponse.status !== "fulfilled" ||
        !productResponse.value?.success
      ) {
        const message =
          productResponse.status === "fulfilled"
            ? productResponse.value?.message
            : "";
        setLoadError(message || "Could not load products.");
        setIsLoading(false);
        return;
      }

      const productData = Array.isArray(productResponse.value.data)
        ? productResponse.value.data
        : [];

      setProducts(productData.map(normalizeProduct));

      if (
        categoryResponse.status === "fulfilled" &&
        categoryResponse.value?.success &&
        Array.isArray(categoryResponse.value.data)
      ) {
        setCategories(categoryResponse.value.data.map((item) => item.name));
      }

      setIsLoading(false);
    }

    loadData().catch(() => {
      if (active) {
        setLoadError("Could not connect to catalog data.");
        setIsLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        String(product.name || "")
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(product.sku || "")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory =
        category === "All Categories" || product.category === category;

      const threshold = Number(product.lowStockThreshold ?? 5);
      const matchesStock =
        stockFilter === "All Stock" ||
        (stockFilter === "In Stock" && product.stock > threshold) ||
        (stockFilter === "Low Stock" &&
          product.stock > 0 &&
          product.stock <= threshold) ||
        (stockFilter === "Out of Stock" && product.stock <= 0);

      const matchesStatus =
        statusFilter === "All Status" || product.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStock && matchesStatus;
    });
  }, [products, search, category, stockFilter, statusFilter]);

  const totalValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  );

  const lowStockCount = products.filter(
    (product) =>
      product.stock > 0 &&
      product.stock <= Number(product.lowStockThreshold ?? 5),
  ).length;

  const outOfStockCount = products.filter(
    (product) => product.stock <= 0,
  ).length;

  function openEditModal(product) {
    setEditingProduct(product);
    setForm({
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
    });
    setFormError("");
  }

  function closeEditModal() {
    if (isSaving) return;
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setFormError("");
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (formError) setFormError("");
  }

  function handleFeatureChange(index, value) {
    setForm((current) => ({
      ...current,
      features: current.features.map((item, i) => (i === index ? value : item)),
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
    if (!editingProduct) return;

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
      (product) =>
        String(product.sku).toLowerCase() === sku.toLowerCase() &&
        product.id !== editingProduct.id,
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
      status: form.status,
      images: form.image.trim() ? [form.image.trim()] : [],
    };

    setIsSaving(true);
    setFormError("");

    try {
      const result = await updateProduct(editingProduct.id, productData);

      if (!result?.success) {
        setFormError(result?.message || "Could not update product.");
        return;
      }

      const updatedFromServer = result.data
        ? normalizeProduct(result.data)
        : null;

      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? normalizeProduct({
                ...product,
                ...(updatedFromServer || productData),
                ...(!updatedFromServer ? productData : {}),
                _id: editingProduct.id,
                images: productData.images,
              })
            : product,
        ),
      );

      setEditingProduct(null);
      setForm(EMPTY_FORM);
    } catch (error) {
      setFormError(error?.message || "Could not update product.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget || isDeleting) return;

    setIsDeleting(true);
    setLoadError("");

    try {
      const result = await deleteProduct(deleteTarget.id);

      if (!result?.success) {
        setLoadError(result?.message || "Could not delete product.");
        return;
      }

      setProducts((current) =>
        current.filter((product) => product.id !== deleteTarget.id),
      );
      setDeleteTarget(null);
    } catch (error) {
      setLoadError(error?.message || "Could not delete product.");
    } finally {
      setIsDeleting(false);
    }
  }

  function resetFilters() {
    setSearch("");
    setCategory("All Categories");
    setStockFilter("All Stock");
    setStatusFilter("All Status");
  }

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {(isLoading || loadError) && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              loadError
                ? "border-amber-200 bg-amber-50 text-amber-900"
                : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {loadError || "Loading products..."}
          </div>
        )}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
              <span>Admin</span>
              <span>/</span>
              <span className="font-medium text-slate-700">Products</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Products
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your catalog, pricing, and inventory.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/dashboard/admin/products/add")}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Products"
            value={products.length}
            helper="Products in your catalog"
            icon={<Package size={20} />}
            iconClass="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            label="Inventory Units"
            value={products.reduce((sum, product) => sum + product.stock, 0)}
            helper="Total units currently in stock"
            icon={<Boxes size={20} />}
            iconClass="bg-violet-50 text-violet-600"
          />
          <SummaryCard
            label="Inventory Value"
            value={formatPrice(totalValue)}
            helper="Based on current stock and selling price"
            icon={<CircleDollarSign size={20} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            label="Stock Alerts"
            value={lowStockCount + outOfStockCount}
            helper={`${lowStockCount} low stock · ${outOfStockCount} out of stock`}
            icon={<AlertTriangle size={20} />}
            iconClass="bg-amber-50 text-amber-600"
          />
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-semibold text-slate-900">All Products</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {filteredProducts.length} of {products.length} products shown
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:flex">
                <label className="relative block sm:col-span-2 xl:w-72">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search name or SKU..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </label>

                <SelectFilter
                  value={category}
                  onChange={setCategory}
                  options={["All Categories", ...categories].map((item) => ({
                    value: item,
                    label: item,
                  }))}
                  ariaLabel="Filter by category"
                />
                <SelectFilter
                  value={stockFilter}
                  onChange={setStockFilter}
                  options={[
                    { value: "All Stock", label: "All Stock" },
                    { value: "In Stock", label: "In Stock" },
                    { value: "Low Stock", label: "Low Stock" },
                    { value: "Out of Stock", label: "Out of Stock" },
                  ]}
                  ariaLabel="Filter by stock"
                />
                <SelectFilter
                  value={statusFilter}
                  onChange={setStatusFilter}
                  options={[
                    { value: "All Status", label: "All Status" },
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                    { value: "draft", label: "Draft" },
                  ]}
                  ariaLabel="Filter by status"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5 font-semibold">Product</th>
                  <th className="px-5 py-3.5 font-semibold">SKU</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Price</th>
                  <th className="px-5 py-3.5 font-semibold">Stock</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => {
                  const threshold = Number(product.lowStockThreshold ?? 5);

                  return (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <ProductThumbnail product={product} />
                          <div>
                            <p className="max-w-56 font-semibold text-slate-800">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">
                        {product.sku}
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {product.category || "—"}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                        {formatPrice(product.price)}
                      </td>
                      <td className="px-5 py-4">
                        <div className="space-y-1.5">
                          <p className="text-sm font-semibold text-slate-800">
                            {product.stock} units
                          </p>
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStockClasses(
                              product.stock,
                              threshold,
                            )}`}
                          >
                            {getStockLabel(product.stock, threshold)}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => openEditModal(product)}
                            aria-label={`Edit ${product.name}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={16} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteTarget(product)}
                            aria-label={`Delete ${product.name}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Package size={22} />
                        </div>
                        <p className="mt-3 font-semibold text-slate-800">
                          No products found
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try changing your search or filters.
                        </p>
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-slate-100 px-5 py-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing{" "}
              <span className="font-semibold text-slate-700">
                {filteredProducts.length}
              </span>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-2 self-start font-medium text-slate-600 hover:text-blue-600 sm:self-auto"
            >
              <SlidersHorizontal size={15} />
              Reset filters
            </button>
          </div>
        </section>
      </div>

      {/* Edit Product Modal: product creation is handled by AddProductPage. */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeEditModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-product-modal-title"
            className="my-auto max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
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
                onClick={closeEditModal}
                disabled={isSaving}
                aria-label="Close edit modal"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="max-h-[calc(92vh-145px)] space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
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
                        {categories.map((item) => (
                          <option key={item} value={item} />
                        ))}
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
                        <option value="inactive">Inactive</option>
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

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving ? "Saving Changes..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isDeleting) {
              setDeleteTarget(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>
            <h2
              id="delete-modal-title"
              className="mt-4 text-lg font-bold text-slate-900"
            >
              Delete this product?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              You are about to delete{" "}
              <span className="font-semibold text-slate-700">
                {deleteTarget.name}
              </span>
              . This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SummaryCard({ label, value, helper, icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">{helper}</p>
    </div>
  );
}

function ProductThumbnail({ product }) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name || "Product"}
        className="h-12 w-12 rounded-xl border border-slate-100 object-cover"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    );
  }

  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-slate-400">
      <ImageIcon size={20} />
    </div>
  );
}

function StatusBadge({ status }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  const classes =
    status === "active"
      ? "bg-emerald-50 text-emerald-700"
      : status === "draft"
        ? "bg-amber-50 text-amber-700"
        : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${classes}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "active"
            ? "bg-emerald-500"
            : status === "draft"
              ? "bg-amber-500"
              : "bg-slate-400"
        }`}
      />
      {label}
    </span>
  );
}

function SelectFilter({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative min-w-36">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

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
