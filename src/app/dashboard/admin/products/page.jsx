"use client";

import { useMemo, useState } from "react";
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
} from "lucide-react";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Anker PowerCore 20K",
    sku: "PB-ANK-20000",
    category: "Power Bank",
    price: 2490,
    stock: 24,
    status: "Active",
    image: "",
  },
  {
    id: 2,
    name: "Baseus Bowie WM02",
    sku: "EAR-BAS-WM02",
    category: "Earbuds",
    price: 1890,
    stock: 8,
    status: "Active",
    image: "",
  },
  {
    id: 3,
    name: "UGREEN USB-C Cable 100W",
    sku: "CB-UGR-100W",
    category: "Cables",
    price: 650,
    stock: 0,
    status: "Draft",
    image: "",
  },
  {
    id: 4,
    name: "Oraimo Watch 4 Plus",
    sku: "WT-ORA-W4P",
    category: "Smart Watch",
    price: 3290,
    stock: 13,
    status: "Active",
    image: "",
  },
  {
    id: 5,
    name: "Apple 20W USB-C Adapter",
    sku: "AD-APL-20W",
    category: "Charger",
    price: 1950,
    stock: 5,
    status: "Active",
    image: "",
  },
  {
    id: 6,
    name: "JBL Tune 520BT",
    sku: "HP-JBL-520BT",
    category: "Headphones",
    price: 4250,
    stock: 17,
    status: "Active",
    image: "",
  },
];

const CATEGORIES = [
  "All Categories",
  "Charger",
  "Cables",
  "Earbuds",
  "Headphones",
  "Power Bank",
  "Smart Watch",
  "Other",
];

const EMPTY_FORM = {
  name: "",
  sku: "",
  category: "Charger",
  price: "",
  stock: "",
  status: "Active",
  image: "",
};

function formatPrice(value) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function getStockLabel(stock) {
  if (stock === 0) return "Out of stock";
  if (stock <= 5) return "Low stock";
  return "In stock";
}

function getStockClasses(stock) {
  if (stock === 0) return "bg-red-50 text-red-700 ring-red-600/20";
  if (stock <= 5) return "bg-amber-50 text-amber-700 ring-amber-600/20";
  return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [stockFilter, setStockFilter] = useState("All Stock");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.sku.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        category === "All Categories" || product.category === category;

      const matchesStock =
        stockFilter === "All Stock" ||
        (stockFilter === "In Stock" && product.stock > 5) ||
        (stockFilter === "Low Stock" &&
          product.stock > 0 &&
          product.stock <= 5) ||
        (stockFilter === "Out of Stock" && product.stock === 0);

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
    (product) => product.stock > 0 && product.stock <= 5,
  ).length;
  const outOfStockCount = products.filter(
    (product) => product.stock === 0,
  ).length;

  function openAddModal() {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      status: product.status,
      image: product.image || "",
    });
    setFormError("");
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setFormError("");
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const sku = form.sku.trim();

    if (!name || !sku || form.price === "" || form.stock === "") {
      setFormError("Please complete all required fields.");
      return;
    }

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!Number.isFinite(price) || price < 0) {
      setFormError("Price must be a valid non-negative number.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setFormError("Stock must be a whole number of 0 or more.");
      return;
    }

    const duplicateSku = products.some(
      (product) =>
        product.sku.toLowerCase() === sku.toLowerCase() &&
        product.id !== editingProduct?.id,
    );

    if (duplicateSku) {
      setFormError("A product with this SKU already exists.");
      return;
    }

    const productData = {
      id: editingProduct?.id ?? Date.now(),
      name,
      sku,
      category: form.category,
      price,
      stock,
      status: form.status,
      image: form.image.trim(),
    };

    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id ? productData : product,
        ),
      );
    } else {
      setProducts((current) => [productData, ...current]);
    }

    closeModal();
  }

  function handleDelete() {
    if (!deleteTarget) return;
    setProducts((current) =>
      current.filter((product) => product.id !== deleteTarget.id),
    );
    setDeleteTarget(null);
  }

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page heading */}
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
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <Plus size={18} />
            Add Product
          </button>
        </div>

        {/* Summary cards */}
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
            helper="Based on current stock and price"
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

        {/* Product list */}
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
                  options={CATEGORIES.map((item) => ({
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
                    { value: "Active", label: "Active" },
                    { value: "Draft", label: "Draft" },
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
                {filteredProducts.map((product) => (
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
                      {product.category}
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
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStockClasses(product.stock)}`}
                        >
                          {getStockLabel(product.stock)}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                          product.status === "Active"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            product.status === "Active"
                              ? "bg-emerald-500"
                              : "bg-slate-400"
                          }`}
                        />
                        {product.status}
                      </span>
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
                ))}

                {filteredProducts.length === 0 && (
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
                          onClick={() => {
                            setSearch("");
                            setCategory("All Categories");
                            setStockFilter("All Stock");
                            setStatusFilter("All Status");
                          }}
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
              onClick={() => {
                setSearch("");
                setCategory("All Categories");
                setStockFilter("All Stock");
                setStatusFilter("All Status");
              }}
              className="inline-flex items-center gap-2 self-start font-medium text-slate-600 hover:text-blue-600 sm:self-auto"
            >
              <SlidersHorizontal size={15} />
              Reset filters
            </button>
          </div>
        </section>
      </div>

      {/* Add / Edit modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="product-modal-title"
                  className="text-lg font-bold text-slate-900"
                >
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Enter the product details below.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 px-5 py-5 sm:grid-cols-2 sm:px-6">
                <FormField label="Product Name *">
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="e.g. 20W Fast Charger"
                    className={inputClass}
                    autoFocus
                  />
                </FormField>
                <FormField label="SKU *">
                  <input
                    name="sku"
                    value={form.sku}
                    onChange={handleFormChange}
                    placeholder="e.g. CH-APL-20W"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Category *">
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleFormChange}
                    className={inputClass}
                  >
                    {CATEGORIES.filter((item) => item !== "All Categories").map(
                      (item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ),
                    )}
                  </select>
                </FormField>
                <FormField label="Price (BDT) *">
                  <input
                    name="price"
                    type="number"
                    min="0"
                    step="1"
                    value={form.price}
                    onChange={handleFormChange}
                    placeholder="0"
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
                    placeholder="0"
                    className={inputClass}
                  />
                </FormField>
                <FormField label="Status *">
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                    className={inputClass}
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </FormField>
                <div className="sm:col-span-2">
                  <FormField label="Image URL (optional)">
                    <input
                      name="image"
                      type="url"
                      value={form.image}
                      onChange={handleFormChange}
                      placeholder="https://example.com/product.jpg"
                      className={inputClass}
                    />
                  </FormField>
                </div>
                {formError && (
                  <p className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                    {formError}
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100"
                >
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDeleteTarget(null);
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
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50";

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
        alt={product.name}
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
