"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "@/components/ui/ProductCard";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/api/wishlist";

export default function TrendingProductsClient({ products }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    let active = true;

    getWishlist()
      .then((result) => {
        if (
          active &&
          result?.success &&
          Array.isArray(result.data?.items)
        ) {
          setWishlist(
            result.data.items.map((item) => String(item.productId)),
          );
        }
      })
      .catch(() => {
        if (active) toast.error("Could not load your saved wishlist.");
      });

    return () => {
      active = false;
    };
  }, []);

  const toggleWishlist = async (productId) => {
    try {
      const result = wishlist.includes(productId)
        ? await removeFromWishlist(productId)
        : await addToWishlist(productId);

      if (!result?.success) {
        toast.error(result?.message || "Sign in to update your wishlist.");
        return;
      }

      setWishlist((current) =>
        current.includes(productId)
          ? current.filter((id) => id !== productId)
          : [...current, productId],
      );
    } catch {
      toast.error("Could not update your wishlist.");
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isWishListed={wishlist.includes(product.id)}
          onWishlist={toggleWishlist}
        />
      ))}
    </div>
  );
}
