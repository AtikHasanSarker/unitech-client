"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
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
import Navbar from "@/components/Navbar";

const products = [
  {
    id: "p1",
    name: "Baseus Bowie WM02 Wireless Earbuds",
    brand: "Baseus",
    category: "Earphones",
    price: 1450,
    oldPrice: 1890,
    rating: 4.8,
    reviews: 124,
    stock: 18,
    sku: "UT-AUD-001",
    badge: "BEST SELLER",
    description:
      "Enjoy your everyday listening experience with these compact wireless earbuds. Designed for music, calls, online classes, and entertainment, they are a practical choice for students and everyday users.",
    features: [
      "Wireless Bluetooth connectivity",
      "Compact, lightweight design",
      "Convenient charging case",
      "Suitable for music and calls",
    ],
    specifications: [
      ["Brand", "Baseus"],
      ["Category", "Wireless Earbuds"],
      ["Connectivity", "Bluetooth"],
      ["Color", "Black"],
      ["Warranty", "Check product warranty at purchase"],
    ],
    images: [
      "https://placehold.co/900x900/f5f3ff/7c3aed?text=Wireless+Earbuds",
      "https://placehold.co/900x900/ede9fe/6d28d9?text=Earbuds+Case",
      "https://placehold.co/900x900/e0e7ff/4338ca?text=Product+Details",
      "https://placehold.co/900x900/f8fafc/475569?text=Package",
    ],
  },
  {
    id: "p2",
    name: "UGREEN 20W USB-C Fast Charger",
    brand: "UGREEN",
    category: "Chargers",
    price: 890,
    oldPrice: 1090,
    rating: 4.7,
    reviews: 86,
    stock: 12,
    sku: "UT-CHG-002",
    badge: "POPULAR",
    description:
      "A compact USB-C charger for compatible phones and accessories. Check your device's supported charging protocol before purchasing to ensure compatibility.",
    features: [
      "Compact wall charger design",
      "USB-C charging connection",
      "Convenient for home and travel",
      "Compatible with supported devices",
    ],
    specifications: [
      ["Brand", "UGREEN"],
      ["Category", "Fast Charger"],
      ["Output", "Up to 20W (model dependent)"],
      ["Port", "USB-C"],
      ["Warranty", "Check product warranty at purchase"],
    ],
    images: [
      "https://placehold.co/900x900/eff6ff/2563eb?text=Fast+Charger",
      "https://placehold.co/900x900/dbeafe/1d4ed8?text=Charger+Side",
      "https://placehold.co/900x900/e0f2fe/0369a1?text=USB-C+Port",
      "https://placehold.co/900x900/f8fafc/475569?text=Packaging",
    ],
  },
  {
    id: "p3",
    name: "Baseus Cafule USB-C Cable",
    brand: "Baseus",
    category: "Cables",
    price: 390,
    oldPrice: 490,
    rating: 4.6,
    reviews: 58,
    stock: 25,
    sku: "UT-CAB-003",
    badge: "",
    description:
      "A practical USB-C cable for everyday charging and compatible devices. Confirm the connector type, charging capacity, and data-transfer specifications of the exact model before purchase.",
    features: [
      "USB-C connection",
      "Convenient everyday cable",
      "Portable design",
      "Suitable for compatible devices",
    ],
    specifications: [
      ["Brand", "Baseus"],
      ["Category", "Charging Cable"],
      ["Connector", "USB-C"],
      ["Color", "Black"],
      ["Warranty", "Check product warranty at purchase"],
    ],
    images: [
      "https://placehold.co/900x900/f1f5f9/475569?text=USB-C+Cable",
      "https://placehold.co/900x900/e2e8f0/334155?text=Cable+Connector",
      "https://placehold.co/900x900/f8fafc/64748b?text=Cable+Detail",
      "https://placehold.co/900x900/e0f2fe/0369a1?text=Packaging",
    ],
  },
  {
    id: "p4",
    name: "Remax 10000mAh Power Bank",
    brand: "Remax",
    category: "Power Banks",
    price: 1690,
    oldPrice: 1990,
    rating: 4.8,
    reviews: 93,
    stock: 9,
    sku: "UT-PWB-004",
    badge: "SALE",
    description:
      "A portable power bank designed for charging compatible devices while travelling or attending classes. Actual output and charging speed depend on the exact model and connected device.",
    features: [
      "Portable battery pack",
      "Useful for everyday travel",
      "Rechargeable design",
      "Compatible with supported devices",
    ],
    specifications: [
      ["Brand", "Remax"],
      ["Category", "Power Bank"],
      ["Capacity", "10000mAh"],
      ["Charging", "Model dependent"],
      ["Warranty", "Check product warranty at purchase"],
    ],
    images: [
      "https://placehold.co/900x900/ecfeff/0891b2?text=Power+Bank",
      "https://placehold.co/900x900/cffafe/0e7490?text=Power+Bank+Side",
      "https://placehold.co/900x900/e0f2fe/0369a1?text=Ports",
      "https://placehold.co/900x900/f8fafc/475569?text=Packaging",
    ],
  },
];

const relatedProducts = [
  {
    id: "p1",
    name: "Baseus Bowie WM02 Wireless Earbuds",
    price: 1450,
    oldPrice: 1890,
    image: "https://placehold.co/500x500/f5f3ff/7c3aed?text=Wireless+Earbuds",
  },
  {
    id: "p2",
    name: "UGREEN 20W USB-C Fast Charger",
    price: 890,
    oldPrice: 1090,
    image: "https://placehold.co/500x500/eff6ff/2563eb?text=Fast+Charger",
  },
  {
    id: "p3",
    name: "Baseus Cafule USB-C Cable",
    price: 390,
    oldPrice: 490,
    image: "https://placehold.co/500x500/f1f5f9/475569?text=USB-C+Cable",
  },
  {
    id: "p4",
    name: "Remax 10000mAh Power Bank",
    price: 1690,
    oldPrice: 1990,
    image: "https://placehold.co/500x500/ecfeff/0891b2?text=Power+Bank",
  },
];

const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

export default function ProductDetailsPage() {
  const params = useParams();
  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const product = products.find((item) => item.id === productId);

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");

  const showNotice = (message) => {
    setNotice(message);
  };

  const addToCart = () => {
    setCartCount((count) => count + quantity);
    showNotice(`${quantity} item(s) added to your demo cart.`);
  };

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[65vh] items-center justify-center bg-[#f8fafc] px-5">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Package size={34} />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-slate-900">
              Product not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              This product is not available in the current placeholder dataset.
              Try another product from the listing page.
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
      <Navbar />

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
                    onClick={() => setIsWishlisted((value) => !value)}
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
                  Product details demo
                </span>
              </div>

              <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-[36px]">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <div className="flex items-center gap-1.5">
                  <Star size={17} fill="#F59E0B" stroke="#F59E0B" />
                  <span className="text-sm font-bold text-slate-800">
                    {product.rating}
                  </span>
                </div>

                <span className="text-sm text-slate-300">|</span>

                <span className="text-sm text-slate-500">
                  {product.reviews} reviews
                </span>

                <span className="text-sm text-slate-300">|</span>

                <span className="text-xs text-slate-500">
                  SKU: {product.sku}
                </span>
              </div>

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
                Final price and availability will be confirmed when connected to
                the live product API.
              </p>

              {/* Stock */}
              <div className="mt-6 flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span className="text-sm font-semibold text-emerald-700">
                  {product.stock > 0
                    ? `In stock — ${product.stock} units (demo)`
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
                  onClick={() =>
                    showNotice("Checkout will be available after integration.")
                  }
                  disabled={product.stock <= 0}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Buy Now
                  <ChevronRight size={17} />
                </button>
              </div>

              <button
                onClick={() => setIsWishlisted((value) => !value)}
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
                    showNotice("Product sharing can be enabled later.")
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
                { id: "reviews", label: `Reviews (${product.reviews})` },
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
                    {product.features.map((feature) => (
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
                    ))}
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

              {activeTab === "reviews" && (
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
                        {product.reviews} demo reviews
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        Customer reviews
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
                        The rating shown here is placeholder data for the
                        design. Real customer reviews and review submission will
                        be connected later.
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
              {relatedProducts
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
                        <span className="text-xs text-slate-400 line-through">
                          {formatPrice(item.oldPrice)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        </section>

        {/* Demo feedback */}
        {notice && (
          <div
            role="status"
            className="fixed bottom-5 right-5 z-[120] flex max-w-[calc(100vw-40px)] items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-xl"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={17} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-slate-900">
                Demo interaction
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{notice}</p>
              <p className="mt-2 text-xs font-semibold text-blue-600">
                Items added this session: {cartCount}
              </p>
            </div>

            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </main>
    </>
  );
}
