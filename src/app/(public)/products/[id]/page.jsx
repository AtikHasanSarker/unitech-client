"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  X,
  Package,
  Share2,
  BadgeCheck,
} from "lucide-react";
import { addCartItem } from "@/lib/api/cart";
import { getProductById, getProducts } from "@/lib/api/product";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/api/wishlist";

const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [product, setProduct] = useState(null);
  const [relatedProductsList, setRelatedProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [productError, setProductError] = useState("");

  useEffect(() => {
    let active = true;

    getProductById(productId)
      .then(async (result) => {
        if (!active) return;
        if (!result?.success) {
          setProduct(null);
          setProductError(result?.message || "Product not found.");
          return;
        }

        const currentProduct = result.data;
        const normalizedProduct = {
          ...currentProduct,
          id: currentProduct._id,
          images: currentProduct.images?.length ? currentProduct.images : ["/favicon.ico"],
          features: Array.isArray(currentProduct.features) ? currentProduct.features : [],
          specifications: Object.entries(currentProduct.specifications || {
            Brand: currentProduct.brand || "Not specified",
            Category: currentProduct.category || "Not specified",
            Stock: Number(currentProduct.stock) > 0 ? currentProduct.stock : "Out of stock",
          }),
        };

        setProduct(normalizedProduct);
        setActiveImage(0);

        const [relatedResult, wishlistResult] = await Promise.all([
          getProducts({ category: currentProduct.category, page: 1, limit: 5 }),
          getWishlist(),
        ]);

        if (!active) return;
        if (relatedResult?.success) {
          setRelatedProductsList(
            relatedResult.data
              .filter((item) => item._id !== currentProduct._id)
              .map((item) => ({
                ...item,
                id: item._id,
                image: item.images?.[0] || "/favicon.ico",
              })),
          );
        }
        if (wishlistResult?.success) {
          setIsWishlisted(
            wishlistResult.data.items.some((item) => item.productId === currentProduct._id),
          );
        }
      })
      .catch(() => {
        if (active) setProductError("Could not connect to the product service.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productId]);

  const addToCart = async () => {
    try {
      const result = await addCartItem(productId, quantity);
      if (!result?.success) {
        toast.error(result?.message || "Sign in to add this product to your cart.");
        return false;
      }
      toast.success(`${quantity} item(s) added to your cart.`);
      return true;
    } catch {
      toast.error("Could not add this product to your cart.");
      return false;
    }
  };

  const toggleWishlist = async () => {
    try {
      const result = isWishlisted
        ? await removeFromWishlist(productId)
        : await addToWishlist(productId);
      if (!result?.success) {
        toast.error(result?.message || "Sign in to update your wishlist.");
        return;
      }
      setIsWishlisted((value) => !value);
    } catch {
      toast.error("Could not update your wishlist.");
    }
  };

  const buyNow = async () => {
    if (await addToCart()) router.push("/cart");
  };

  if (!product) {
    return (
      <>
        <main className="flex min-h-[65vh] items-center justify-center bg-[#f8fafc] px-5">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Package size={34} />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              {isLoading ? "Loading product..." : "Product not found"}
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              {productError || "This product is not available. Try another product from the listing page."}
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <ChevronLeft size={17} />
              Back to Products
            </Link>
          </div>
        </main>
      </>
    );
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <>
      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        {/* Breadcrumb */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-4 sm:px-8 lg:px-10">
            <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <ChevronRight size={13} />
              <Link href="/products" className="hover:text-blue-600">
                Products
              </Link>
              <ChevronRight size={13} />
              <Link
                href={`/products?category=${encodeURIComponent(product.category)}`}
                className="hover:text-blue-600"
              >
                {product.category}
              </Link>
              <ChevronRight size={13} />
              <span className="max-w-[180px] truncate font-medium text-slate-700 sm:max-w-xs">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Main Product */}
        <section className="mx-auto max-w-[1440px] px-5 py-7 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
            {/* Gallery */}
            <div>
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white">
                <div className="relative aspect-square">
                  <Image
                    src={product.images[activeImage]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-5 sm:p-8"
                  />

                  {product.badge && (
                    <span className="absolute left-5 top-5 rounded-lg bg-slate-900 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white">
                      {product.badge}
                    </span>
                  )}

                  {discount > 0 && (
                    <span className="absolute bottom-5 left-5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-bold text-red-600">
                      Save {discount}%
                    </span>
                  )}

                  <button
                    onClick={toggleWishlist}
                    aria-label={
                      isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className={`absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border transition ${
                      isWishlisted
                        ? "border-red-100 bg-red-50 text-red-500"
                        : "border-slate-200 bg-white text-slate-500 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={20}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setActiveImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    className={`relative aspect-square overflow-hidden rounded-xl border bg-white transition ${
                      activeImage === index
                        ? "border-blue-600 ring-2 ring-blue-600/15"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 25vw, 150px"
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-blue-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-blue-700">
                  {product.brand}
                </span>

                <span className="inline-flex items-center gap-1 text-xs text-emerald-700">
                  <BadgeCheck size={15} />
                  Product details
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-[36px]">
                {product.name}
              </h1>

              {(product.rating !== undefined || product.sku) && (
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                  {product.rating !== undefined && (
                    <span className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
                      <Star size={17} fill="#F59E0B" stroke="#F59E0B" />
                      {product.rating}
                      {product.reviews !== undefined && (
                        <span className="font-normal text-slate-500">
                          ({product.reviews} reviews)
                        </span>
                      )}
                    </span>
                  )}
                  {product.sku && (
                    <span className="text-xs text-slate-500">SKU: {product.sku}</span>
                  )}
                </div>
              )}

              <div className="my-6 border-t border-slate-200" />

              {/* Price */}
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  {formatPrice(product.price)}
                </span>

                {product.oldPrice > product.price && (
                  <>
                    <span className="pb-1 text-base text-slate-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                    <span className="mb-1 rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-600">
                      {discount}% OFF
                    </span>
                  </>
                )}
              </div>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Price and availability are current as provided by the store.
              </p>

              {/* Stock */}
              <div className="mt-6 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-emerald-700">
                  {product.stock > 0
                    ? `In stock — ${product.stock} units`
                    : "Currently unavailable"}
                </span>
              </div>

              {/* Quantity */}
              <div className="mt-7">
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  Quantity
                </p>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white">
                    <button
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      disabled={quantity <= 1}
                      aria-label="Decrease quantity"
                      className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:text-blue-600 disabled:opacity-30"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="min-w-8 text-center text-sm font-bold">
                      {quantity}
                    </span>

                    <button
                      onClick={() =>
                        setQuantity((value) =>
                          Math.min(product.stock, value + 1),
                        )
                      }
                      disabled={quantity >= product.stock}
                      aria-label="Increase quantity"
                      className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:text-blue-600 disabled:opacity-30"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <p className="text-xs text-slate-400">
                    Subtotal:{" "}
                    <span className="font-bold text-slate-800">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={addToCart}
                  disabled={product.stock <= 0}
                  className="flex h-13 min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={buyNow}
                  disabled={product.stock <= 0}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Buy Now
                  <ChevronRight size={17} />
                </button>
              </div>

              <button
                onClick={toggleWishlist}
                className="mt-4 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium text-slate-500 transition hover:text-red-500"
              >
                <Heart
                  size={17}
                  fill={isWishlisted ? "currentColor" : "none"}
                />
                {isWishlisted ? "Added to Wishlist" : "Add to Wishlist"}
              </button>

              {/* Benefits */}
              <div className="mt-7 grid grid-cols-1 gap-3 border-t border-slate-200 pt-6 sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-xl bg-white p-3">
                  <Truck size={20} className="mt-0.5 shrink-0 text-blue-600" />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Delivery</p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">
                      Check delivery options at checkout
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-3">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Product Support
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">
                      Confirm warranty before purchase
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white p-3">
                  <RotateCcw
                    size={20}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-800">Returns</p>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">
                      See the return policy
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Share this product
                <button
                  onClick={() =>
                    toast("Product sharing is not available yet.")
                  }
                  className="ml-2 inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-blue-600"
                >
                  <Share2 size={13} />
                  Share
                </button>
              </p>
            </div>
          </div>

          {/* Details Tabs */}
          <section className="mt-14 overflow-hidden rounded-2xl border border-slate-200 bg-white sm:mt-20">
            <div className="flex gap-6 overflow-x-auto border-b border-slate-200 px-5 sm:px-8">
              {[
                { id: "description", label: "Description" },
                { id: "specifications", label: "Specifications" },
                ...(product.rating !== undefined
                  ? [{ id: "reviews", label: `Reviews (${product.reviews || 0})` }]
                  : []),
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative shrink-0 py-5 text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-blue-600" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-5 sm:p-8">
              {activeTab === "description" && (
                <div className="max-w-3xl">
                  <h2 className="text-lg font-bold text-slate-900">
                    About this product
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {product.description}
                  </p>

                  <h3 className="mt-7 text-sm font-bold text-slate-900">
                    Key features
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {product.features.length > 0 ? product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm text-slate-600"
                      >
                        <Check
                          size={17}
                          className="mt-0.5 shrink-0 text-emerald-600"
                        />
                        {feature}
                      </li>
                    )) : (
                      <li className="text-sm text-slate-500">No additional features listed.</li>
                    )}
                  </ul>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="max-w-3xl">
                  <h2 className="mb-5 text-lg font-bold text-slate-900">
                    Technical specifications
                  </h2>

                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    {product.specifications.map(([label, value], index) => (
                      <div
                        key={label}
                        className={`grid grid-cols-1 gap-1 px-4 py-3.5 sm:grid-cols-[180px_1fr] sm:gap-4 ${
                          index % 2 === 0 ? "bg-slate-50" : "bg-white"
                        }`}
                      >
                        <span className="text-xs font-semibold text-slate-500">
                          {label}
                        </span>
                        <span className="text-sm text-slate-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && product.rating !== undefined && (
                <div className="max-w-3xl">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    <div className="rounded-2xl bg-blue-50 p-6 text-center">
                      <p className="text-4xl font-extrabold text-slate-900">
                        {product.rating}
                      </p>
                      <div className="mt-2 flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            fill={
                              star <= Math.round(product.rating)
                                ? "#F59E0B"
                                : "none"
                            }
                            stroke="#F59E0B"
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-slate-500">
                        {product.reviews || 0} reviews
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Customer reviews
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                        Review details are not available for this product.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Related Products */}
          <section className="mt-14 sm:mt-20">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                  You may also like
                </p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
                  Related Products
                </h2>
              </div>

              <Link
                href="/products"
                className="hidden items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 sm:inline-flex"
              >
                View all <ChevronRight size={17} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {relatedProductsList
                .filter((item) => item.id !== product.id)
                .map((item) => (
                  <Link
                    href={`/products/${item.id}`}
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                  >
                    <div className="relative aspect-square bg-slate-50">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="min-h-10 text-sm font-semibold leading-5 text-slate-800 transition-colors group-hover:text-blue-600">
                        {item.name}
                      </h3>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="font-bold text-slate-900">
                          {formatPrice(item.price)}
                        </span>
                        {item.oldPrice > item.price && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatPrice(item.oldPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </section>

      </main>
    </>
  );
}
