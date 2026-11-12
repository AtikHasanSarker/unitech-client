"use client";

import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { useCart } from "@/components/cart/CartProvider";
import { getProductById } from "@/lib/api/product";
import {
  getWishlist,
  removeFromWishlist as removeWishlistItem,
} from "@/lib/api/wishlist";

function ProductCard({ product, onRemove, onAddToCart, isAdded }) {
  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50">
      {/* Product Image */}
      <div className="relative overflow-hidden bg-white">
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
  const { addItem } = useCart();
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  useEffect(() => {
    let active = true;

    getWishlist()
      .then(async (result) => {
        if (!active) return;
        if (!result?.success) {
          toast.error(result?.message || "Sign in to load your wishlist.");
          return;
        }

        if (!Array.isArray(result.data?.items)) {
          toast.error("Your wishlist response was invalid. Please try again.");
          return;
        }

        const products = await Promise.all(
          result.data.items.map(async (savedItem) => {
            const productId =
              typeof savedItem.productId === "object"
                ? savedItem.productId?._id || savedItem.productId?.id
                : savedItem.productId;
            const productResult = productId
              ? await getProductById(productId)
              : null;
            const product = productResult?.success ? productResult.data : null;
            return {
              id: String(productId || savedItem._id),
              name: product?.name || savedItem.name || "Product",
              category:
                typeof product?.category === "string"
                  ? product.category
                  : product?.category?.name || "Products",
              price: Number(product?.price ?? savedItem.price) || 0,
              oldPrice: product?.oldPrice,
              rating: product?.rating,
              reviews: product?.reviews,
              image:
                product?.images?.[0] ||
                savedItem.image ||
                "/images/product-placeholder.png",
              stock: product && Number(product.stock) > 0 ? "In Stock" : "Out of Stock",
            };
          }),
        );

        if (active) setWishlist(products);
      })
      .catch(() => {
        if (active) toast.error("Could not connect to your wishlist.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

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

  const removeFromWishlist = async (productId) => {
    try {
      const product = wishlist.find((item) => item.id === productId);
      const result = await removeWishlistItem(productId);
      if (!result?.success) {
        toast.error(result?.message || "Could not remove this product.");
        return;
      }

      setWishlist((previous) =>
        previous.filter((item) => item.id !== productId)
      );

      setAddedItems((previous) =>
        previous.filter((item) => item !== productId)
      );

      if (product) {
        toast.success(`${product.name} removed from wishlist.`);
      }
    } catch {
      toast.error("Could not remove this product.");
    }
  };

  const addToCart = async (product) => {
    const added = await addItem(product.id);
    if (added) {
      setAddedItems((previous) =>
        previous.includes(product.id) ? previous : [...previous, product.id]
      );
    }
  };

  const clearWishlist = async () => {
    setIsClearing(true);

    try {
      const results = await Promise.all(
        wishlist.map(async (product) => {
          try {
            return {
              productId: product.id,
              result: await removeWishlistItem(product.id),
            };
          } catch (error) {
            console.error("Wishlist item removal failed:", error);
            return { productId: product.id, result: null };
          }
        }),
      );

      const removedIds = new Set(
        results
          .filter(({ result }) => result?.success)
          .map(({ productId }) => productId),
      );
      const failedCount = results.length - removedIds.size;

      setWishlist((current) =>
        current.filter((product) => !removedIds.has(product.id)),
      );
      setAddedItems((current) =>
        current.filter((productId) => !removedIds.has(productId)),
      );

      if (failedCount > 0) {
        toast.error("Some wishlist items could not be removed.");
        return;
      }

      setShowClearConfirmation(false);
      toast.success("Wishlist cleared.");
    } catch {
      toast.error("Some wishlist items could not be removed.");
    } finally {
      setIsClearing(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">

      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto container px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
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

      <section className="mx-auto container px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {isLoading && (
          <div className="mb-7 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            Loading your saved products...
          </div>
        )}

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
                    disabled={isClearing}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isClearing ? "Clearing..." : "Yes, Clear All"}
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