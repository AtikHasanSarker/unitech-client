"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";
import { Button } from "@heroui/react";

const deals = [
  {
    id: "deal-1",
    name: "Baseus 20W Fast Charger",
    image: "/images/products/baseus-charger.png",
    price: 1190,
    oldPrice: 1490,
    discount: 20,
    rating: 4.8,
    reviews: 120,
    slug: "baseus-20w-fast-charger",
  },
  {
    id: "deal-2",
    name: "UGREEN Type-C Cable (60W)",
    image: "/images/products/ugreen-cable.png",
    price: 490,
    oldPrice: 590,
    discount: 17,
    rating: 4.7,
    reviews: 99,
    slug: "ugreen-type-c-cable",
  },
  {
    id: "deal-3",
    name: "QCY Wireless Earbuds",
    image: "/images/products/qcy-earbuds.png",
    price: 1490,
    oldPrice: 1990,
    discount: 25,
    rating: 4.9,
    reviews: 210,
    slug: "qcy-wireless-earbuds",
  },
  {
    id: "deal-4",
    name: "Remax 10000mAh Power Bank",
    image: "/images/products/remax-powerbank.png",
    price: 1690,
    oldPrice: 1990,
    discount: 15,
    rating: 4.6,
    reviews: 78,
    slug: "remax-10000mah-power-bank",
  },
];

function formatPrice(price) {
  return `৳${price.toLocaleString("en-US")}`;
}

export default function SpecialDeals() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const addToCart = (product) => {
    setCart((prev) =>
      prev.includes(product.id) ? prev : [...prev, product.id]
    );
  };

  return (
    <section className="bg-[#f8fafc] py-14 text-slate-900 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
              <Clock3 size={14} />
              Limited Time Offers
            </div>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Special Deals
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Great accessories. Better prices. Grab your favorites.
            </p>
          </div>

          <Button
            as={Link}
            href="/deals"
            variant="outline"
            className="hidden shrink-0 rounded-full border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 sm:inline-flex"
          >
            View All Deals
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

        {/* Limited Offer Banner */}
        <div className="mb-7 flex flex-col gap-3 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Clock3 size={21} />
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 sm:text-base">
                Deals you don&apos;t want to miss
              </h3>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Shop selected mobile accessories at special prices.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-blue-600/10 px-3 py-1.5 text-xs font-semibold text-blue-700">
            Save up to 25%
          </span>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {deals.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const isAdded = cart.includes(product.id);

            return (
              <article
                key={product.id}
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-900/[0.06] sm:rounded-3xl"
              >
                {/* Product Image */}
                <div className="relative m-2 aspect-square overflow-hidden rounded-xl bg-[#f8fafc] sm:m-3 sm:rounded-2xl">
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

                  {/* Discount Badge */}
                  <span className="absolute left-2 top-2 rounded-lg bg-red-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                    -{product.discount}%
                  </span>

                  {/* Wishlist */}
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

                {/* Product Information */}
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

                  {/* Price and Cart */}
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-red-600 sm:text-base">
                        {formatPrice(product.price)}
                      </p>

                      <p className="mt-0.5 text-[10px] text-slate-400 line-through sm:text-xs">
                        {formatPrice(product.oldPrice)}
                      </p>
                    </div>

                    <Button
                      isIconOnly
                      aria-label={
                        isAdded
                          ? `${product.name} added to cart`
                          : `Add ${product.name} to cart`
                      }
                      onPress={() => addToCart(product)}
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
            href="/deals"
            variant="outline"
            className="rounded-full border-slate-200 bg-white px-6 text-sm font-medium text-slate-700"
          >
            View All Deals
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}