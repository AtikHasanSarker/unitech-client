'use client';
import React from "react";
import ActionButton from "./ActionButton";
import Link from "next/link";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

const ProductCard = ({ product, isWishListed, onWishlist }) => {
     const discount = product.oldPrice
       ? Math.round((1 - product.price / product.oldPrice) * 100)
       : 0;
  return <article className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
      <div
        className={`relative aspect-square overflow-hidden ${product.color}`}
      >
        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 bg-white"
        >
          <Image
            width={100}
            height={200}
            src={product.images?.[0] }
            alt={product.name}
            loading="lazy"
            className="h-full mx-auto w-auto p-2 transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-slate-900 px-2 py-1 text-[9px] font-bold tracking-wider text-white sm:text-[10px]">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
            -{discount}%
          </span>
        )}

        <button
          onClick={() => onWishlist(product.id)}
          aria-label={isWishListed ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute cursor-pointer right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition ${
            isWishListed
              ? "border-red-100 bg-red-50 text-red-500"
              : "border-white/80 bg-white/90 text-slate-500 hover:text-red-500"
          }`}
        >
          <Heart size={17} fill={isWishListed ? "currentColor" : "none"} />
        </button>

        {!product.stock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/65">
            <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="p-3.5 sm:p-4">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-[11px]">
          {product.brand}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="min-h-[40px] text-[13px] font-semibold leading-5 text-slate-800 transition-colors hover:text-blue-600 sm:min-h-[44px] sm:text-sm">
            {product.name}
          </h3>
        </Link>

        {Number.isFinite(product.rating) && (
          <div className="mt-2.5 flex items-center gap-1.5">
            <Star size={13} fill="#F59E0B" stroke="#F59E0B" />

            <span className="text-xs font-semibold text-slate-700">
              {product.rating}
            </span>

            <span className="text-[10px] text-slate-400 sm:text-xs">
              ({product.reviews})
            </span>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
            {formatPrice(product.price)}
          </span>

          {product.oldPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <ActionButton product={product} />
      </div>
    </article>;
};

export default ProductCard;
