"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  ShoppingCart,
  Star,
  Sparkles,
} from "lucide-react";
import { Button } from "@heroui/react";

const products = [
  {
    id: "new-1",
    name: "Baseus Bowie Wireless Earbuds",
    image: "/images/products/baseus-earbuds.png",
    price: 1890,
    oldPrice: 2190,
    rating: 4.8,
    reviews: 86,
    slug: "baseus-bowie-wireless-earbuds",
    badge: "NEW",
  },
  {
    id: "new-2",
    name: "UGREEN 65W GaN Fast Charger",
    image: "/images/products/ugreen-65w-charger.png",
    price: 2490,
    oldPrice: null,
    rating: 4.9,
    reviews: 42,
    slug: "ugreen-65w-gan-charger",
    badge: "NEW",
  },
  {
    id: "new-3",
    name: "Baseus Magnetic Power Bank",
    image: "/images/products/baseus-magnetic-powerbank.png",
    price: 2290,
    oldPrice: 2590,
    rating: 4.7,
    reviews: 64,
    slug: "baseus-magnetic-powerbank",
    badge: "TRENDING",
  },
  {
    id: "new-4",
    name: "UGREEN USB-C Hub Adapter",
    image: "/images/products/ugreen-usb-hub.png",
    price: 1590,
    oldPrice: null,
    rating: 4.8,
    reviews: 35,
    slug: "ugreen-usb-c-hub",
    badge: "NEW",
  },
];

function formatPrice(price) {
  return `৳${price.toLocaleString("en-US")}`;
}

export default function NewArrivals() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (productId) => {
    setCart((prev) =>
      prev.includes(productId) ? prev : [...prev, productId]
    );
  };

  return (
    <section className="bg-white py-14 text-slate-900 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
              <Sparkles size={14} />
              Freshly Added
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              New Arrivals
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
              Discover the latest accessories to upgrade your everyday tech.
            </p>
          </div>

          <Button
            as={Link}
            href="/products?sort=newest"
            variant="outline"
            className="hidden shrink-0 rounded-full border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 sm:inline-flex"
          >
            View All
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isAdded = cart.includes(product.id);

            return (
              <article
                key={product.id}
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-900/[0.06] sm:rounded-3xl"
              >
                {/* Product Image */}
                <div className="relative m-2 aspect-square overflow-hidden rounded-xl bg-slate-50 sm:m-3 sm:rounded-2xl">
                  <Link
                    href={`/products/${product.slug}`}
                    aria-label={`View ${product.name}`}
                    className="absolute inset-0"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 22vw"
                      className="object-contain p-3 transition-transform duration-500 group-hover:scale-105 sm:p-5"
                    />
                  </Link>

                  {/* Product Badge */}
                  <span
                    className={`absolute left-2 top-2 rounded-lg px-2 py-1 text-[10px] font-bold text-white sm:left-3 sm:top-3 sm:text-xs ${
                      product.badge === "TRENDING"
                        ? "bg-violet-600"
                        : "bg-emerald-500"
                    }`}
                  >
                    {product.badge}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      isWishlisted
                        ? `Remove ${product.name} from wishlist`
                        : `Add ${product.name} to wishlist`
                    }
                    aria-pressed={isWishlisted}
                    className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border transition-colors sm:right-3 sm:top-3 ${
                      isWishlisted
                        ? "border-red-100 bg-red-50 text-red-500"
                        : "border-slate-100 bg-white/90 text-slate-500 hover:border-red-100 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={16}
                      fill={isWishlisted ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                {/* Product Details */}
                <div className="px-3 pb-3 pt-1 sm:px-4 sm:pb-4">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-slate-800 transition-colors hover:text-blue-600 sm:text-sm">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={12}
                          fill={
                            index < Math.round(product.rating)
                              ? "currentColor"
                              : "none"
                          }
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>

                    <span className="text-[10px] text-slate-400">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price & Cart */}
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 sm:text-base">
                        {formatPrice(product.price)}
                      </p>

                      {product.oldPrice && (
                        <p className="mt-0.5 text-[10px] text-slate-400 line-through sm:text-xs">
                          {formatPrice(product.oldPrice)}
                        </p>
                      )}
                    </div>

                    <Button
                      isIconOnly
                      aria-label={
                        isAdded
                          ? `${product.name} added to cart`
                          : `Add ${product.name} to cart`
                      }
                      onPress={() => addToCart(product.id)}
                      className={`h-9 w-9 min-w-9 shrink-0 rounded-xl text-white transition-colors ${
                        isAdded
                          ? "bg-emerald-600 hover:bg-emerald-500"
                          : "bg-blue-600 hover:bg-blue-500"
                      }`}
                    >
                      <ShoppingCart size={17} />
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-7 flex justify-center sm:hidden">
          <Button
            as={Link}
            href="/products?sort=newest"
            variant="outline"
            className="rounded-full border-slate-200 bg-white px-6 text-sm font-medium text-slate-700"
          >
            View All Products
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}