"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowRight,
  Search,
  Package,
  ShoppingBag,
  Check,
  X,
  ArrowUpRight,
} from "lucide-react";

const initialWishlist = [
  {
    id: "p1",
    name: "Wireless Bluetooth Earbuds",
    category: "Audio",
    price: 950,
    oldPrice: 1250,
    rating: 4.8,
    reviews: 124,
    image: "https://placehold.co/500x500/DBEAFE/1D4ED8?text=Earbuds",
    stock: "In Stock",
    badge: "Best Seller",
  },
  {
    id: "p2",
    name: "20W Fast Charging Adapter",
    category: "Chargers",
    price: 750,
    oldPrice: 950,
    rating: 4.6,
    reviews: 86,
    image: "https://placehold.co/500x500/FEE2E2/B91C1C?text=Charger",
    stock: "In Stock",
    badge: "Popular",
  },
  {
    id: "p3",
    name: "Premium USB-C Charging Cable",
    category: "Cables",
    price: 350,
    oldPrice: 450,
    rating: 4.5,
    reviews: 58,
    image: "https://placehold.co/500x500/EDE9FE/6D28D9?text=Cable",
    stock: "In Stock",
    badge: null,
  },
  {
    id: "p4",
    name: "20000mAh Power Bank",
    category: "Power Banks",
    price: 1650,
    oldPrice: 1950,
    rating: 4.7,
    reviews: 102,
    image: "https://placehold.co/500x500/DCFCE7/15803D?text=Power+Bank",
    stock: "In Stock",
    badge: "Great Value",
  },
];

function ProductCard({ product, onRemove, onAddToCart, isAdded }) {
  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-slate-50">
        <Link
          href={`/products/${product.id}`}
          className="relative block aspect-square"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-5 transition duration-500 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:text-xs">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
            -{discount}%
          </span>
        )}

        <button
          type="button"
          onClick={() => onRemove(product.id)}
          aria-label={`Remove ${product.name} from wishlist`}
          title="Remove from wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-slate-100 bg-white text-red-500 shadow-sm transition hover:bg-red-50"
        >
          <Heart size={17} fill="currentColor" />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5">
        <p className="text-xs font-medium text-slate-400">
          {product.category}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="mt-2 line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-800 transition hover:text-blue-600 sm:text-base">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-lg font-extrabold text-slate-900">
            ৳{product.price.toLocaleString("en-BD")}
          </span>

          {product.oldPrice && (
            <span className="text-xs text-slate-400 line-through">
              ৳{product.oldPrice.toLocaleString("en-BD")}
            </span>
          )}
        </div>

        <p
          className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${
            product.stock === "In Stock"
              ? "text-emerald-600"
              : "text-red-500"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              product.stock === "In Stock" ? "bg-emerald-500" : "bg-red-500"
            }`}
          />
          {product.stock}
        </p>

        <button
          type="button"
          onClick={() => onAddToCart(product)}
          disabled={product.stock !== "In Stock" || isAdded}
          className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition ${
            isAdded
              ? "bg-emerald-50 text-emerald-700"
              : "bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          }`}
        >
          {isAdded ? <Check size={17} /> : <ShoppingCart size={17} />}
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [notification, setNotification] = useState(null);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const filteredWishlist = wishlist.filter((product) => {
    const query = searchQuery.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  });

  const totalSavings = wishlist.reduce(
    (total, product) =>
      total +
      Math.max(0, (product.oldPrice || product.price) - product.price),
    0
  );

  const showToast = (message, type = "success") => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 2500);
  };

  const removeFromWishlist = (productId) => {
    const product = wishlist.find((item) => item.id === productId);

    setWishlist((previous) =>
      previous.filter((item) => item.id !== productId)
    );

    setAddedItems((previous) =>
      previous.filter((item) => item !== productId)
    );

    if (product) {
      showToast(`${product.name} removed from wishlist.`);
    }
  };

  const addToCart = (product) => {
    /*
     * Demo only:
     * Replace this with your shared cart context/store or
     * cart API so the product is added to the actual cart.
     */

    setAddedItems((previous) =>
      previous.includes(product.id) ? previous : [...previous, product.id]
    );

    showToast(`${product.name} added to cart.`);
  };

  const clearWishlist = () => {
    setWishlist([]);
    setAddedItems([]);
    setShowClearConfirmation(false);
    showToast("Wishlist cleared.");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Toast Notification */}
      {notification && (
        <div
          role="status"
          className={`fixed right-4 top-24 z-[120] flex max-w-sm items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-xl ${
            notification.type === "success"
              ? "border-emerald-100"
              : "border-red-100"
          }`}
        >
          <div
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
              notification.type === "success"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-50 text-red-600"
            }`}
          >
            {notification.type === "success" ? (
              <Check size={18} />
            ) : (
              <X size={18} />
            )}
          </div>

          <p className="text-sm font-medium text-slate-800">
            {notification.message}
          </p>

          <button
            type="button"
            onClick={() => setNotification(null)}
            aria-label="Dismiss notification"
            className="ml-1 text-slate-400 hover:text-slate-700"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-800">Wishlist</span>
          </div>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-500">
                  <Heart size={25} />
                </div>

                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                    My Wishlist
                  </h1>

                  <p className="mt-1 text-sm text-slate-500">
                    Keep your favorite accessories in one place.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 sm:self-auto"
            >
              <ShoppingBag size={18} />
              Explore Products
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Demo Notice */}
        <div className="mb-7 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>Demo wishlist:</strong> The products shown here are sample
          data. Persistent wishlist storage and synchronization with the
          customer&apos;s account can be added through backend integration.
        </div>

        {wishlist.length > 0 ? (
          <>
            {/* Summary */}
            <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                    <Heart size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Saved Products</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-900">
                      {wishlist.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <ShoppingBag size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Available Products</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-900">
                      {wishlist.filter((item) => item.stock === "In Stock").length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Package size={20} />
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Potential Savings</p>
                    <p className="mt-1 text-2xl font-extrabold text-slate-900">
                      ৳{totalSavings.toLocaleString("en-BD")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-md">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search your wishlist..."
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  <span className="font-bold text-slate-800">
                    {filteredWishlist.length}
                  </span>{" "}
                  products
                </p>

                <button
                  type="button"
                  onClick={() => setShowClearConfirmation(true)}
                  className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              </div>
            </div>

            {/* Clear Confirmation */}
            {showClearConfirmation && (
              <div className="mb-6 flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-red-900">
                    Clear your entire wishlist?
                  </p>

                  <p className="mt-1 text-sm text-red-700">
                    This will remove all saved products from this demo
                    wishlist.
                  </p>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => setShowClearConfirmation(false)}
                    className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={clearWishlist}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                  >
                    Yes, Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {filteredWishlist.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
                {filteredWishlist.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onRemove={removeFromWishlist}
                    onAddToCart={addToCart}
                    isAdded={addedItems.includes(product.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                <Search size={32} className="mx-auto text-slate-300" />

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  No matching products
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Try searching with a different product name or category.
                </p>

                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty Wishlist */
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-16 text-center sm:py-20">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-400">
              <Heart size={36} />
            </div>

            <h2 className="mt-6 text-2xl font-extrabold text-slate-900">
              Your wishlist is empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
              Save the accessories you love and find them here whenever
              you need them.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* Student Deal Banner */}
        <div className="relative mt-10 overflow-hidden rounded-2xl bg-slate-900 p-6 sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-400/10 px-3 py-1 text-xs font-bold text-blue-300">
                EXCLUSIVE NSTU OFFER
              </span>

              <h2 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
                Better Deals for NSTU Students
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">
                Discover special offers on mobile accessories made for
                the NSTU campus community.
              </p>
            </div>

            <Link
              href="/deals"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-500"
            >
              Explore Student Deals
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}