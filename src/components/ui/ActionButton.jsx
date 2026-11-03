'use client';
import { Button } from '@heroui/react';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { useCart } from '@/components/cart/CartProvider';

const ActionButton = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div>
      <Button
        onClick={() => addItem(product.id || product._id)}
        disabled={!product.stock}
        aria-label={
          product.stock ? `Add ${product.name} to cart` : "Unavailable"
        }
        className="group/cart relative mt-4 cursor-pointer flex h-11 w-full items-center justify-center overflow-hidden rounded-full bg-blue-600 px-3 text-xs font-semibold text-white transition-colors duration-400 hover:bg-gray-200 hover:text-gray-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:text-sm"
      >
        {product.stock ? (
          <>
            {/* Add to Cart Text */}
            <span className="absolute inset-0 flex items-center justify-center gap-2 transition-all duration-400 ease-out group-hover/cart:-translate-y-full group-hover/cart:opacity-0">
              Add to Cart
            </span>

            {/* Sliding Cart Icon */}
            <span className="absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-400 ease-out group-hover/cart:translate-y-0">
              <ShoppingCart size={20} strokeWidth={2.2} />
            </span>
          </>
        ) : (
          <span>Unavailable</span>
        )}
      </Button>
    </div>
  );
};

export default ActionButton;