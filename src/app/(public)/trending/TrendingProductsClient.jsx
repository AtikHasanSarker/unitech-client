"use client";

import ProductCard from "@/components/ui/ProductCard";
import { useWishlist } from "@/components/wishlist/useWishlist";

export default function TrendingProductsClient({ products }) {
  const { productIds: wishlist, toggleProduct: toggleWishlist } = useWishlist();

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
