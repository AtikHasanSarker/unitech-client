'use client';
import { Button } from '@heroui/react';
import { Check, ShoppingCart } from 'lucide-react';
import React, { useState } from 'react';
import { useCart } from '@/components/cart/CartProvider';

const ActionButton = ({ product }) => {
  const { addItem, items } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const productId = String(product.id || product._id);
  const isAdded = items.some(
    (item) => String(item.id || item.productId) === productId,
  );

  const handleAdd = async () => {
    setIsAdding(true);
    try {
      await addItem(productId);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      <Button
        type="button"
        onClick={handleAdd}
        isDisabled={!product.stock || isAdding}
        aria-label={
          !product.stock
            ? "Unavailable"
            : isAdded
              ? `Add another ${product.name} to cart`
              : `Add ${product.name} to cart`
        }
        className="group/cart relative mt-4 flex h-11 w-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-blue-600 px-3 text-xs font-semibold text-white transition-colors duration-300 hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:text-sm"
      >
        {product.stock ? (
          isAdding ? (
            <span>Adding...</span>
          ) : (
            <>
            {/* Add to Cart Text */}
            <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-400 ease-out group-hover/cart:-translate-y-full group-hover/cart:opacity-0">
              Add to Cart
            </span>

            {/* Sliding Cart Icon */}
            <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-400 ease-out group-hover/cart:translate-y-0">
              {isAdded ? (
                <Check size={20} strokeWidth={2.2} />
              ) : (
                <ShoppingCart size={20} strokeWidth={2.2} />
              )}
            </span>
            </>
          )
        ) : (
          <span>Unavailable</span>
        )}
      </Button>
    </div>
  );
};

export default ActionButton;