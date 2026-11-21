"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, X } from "lucide-react";

const formatPrice = (price) => `৳${Number(price || 0).toLocaleString("en-BD")}`;

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  subtotal,
  onRemove,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/65 backdrop-blur-[2px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute right-0 top-0 flex h-dvh w-full max-w-[410px] flex-col bg-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={19} className="text-blue-600" />
            <h2
              id="cart-drawer-title"
              className="text-lg font-bold text-slate-900"
            >
              Shopping cart
            </h2>
            <span className="text-sm text-slate-400">
              ({items.reduce((count, item) => count + item.quantity, 0)})
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            <X size={18} />
            Close
          </button>
        </header>

        {items.length > 0 ? (
          <>
            <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="relative flex items-start gap-3 px-5 py-4"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                    <Image
                      src={item.image || "/images/product-placeholder.png"}
                      alt={item.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="min-w-0 flex-1 pr-5">
                    <p className="line-clamp-2 text-sm font-semibold leading-5 text-slate-800">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {item.quantity} ×{" "}
                      <span className="font-semibold text-blue-600">
                        {formatPrice(item.price)}
                      </span>
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Remove ${item.name} from cart`}
                    onClick={() => onRemove(item.id)}
                    className="absolute right-4 mt-0.5 text-slate-400 transition hover:text-red-500"
                  >
                    <X size={15} />
                  </button>
                </article>
              ))}
            </div>

            <footer className="border-t border-slate-200 px-5 pb-5 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Subtotal:</span>
                <span className="text-lg font-bold text-blue-600">
                  {formatPrice(subtotal)}
                </span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-blue-100">
                <div className="h-full w-full rounded-full bg-blue-600" />
              </div>

              <Link
                href="/cart"
                onClick={onClose}
                className="mt-3 flex h-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700 transition hover:bg-slate-200"
              >
                View Cart
              </Link>
              <Link
                href="/cart"
                onClick={onClose}
                className="mt-2 flex h-11 items-center justify-center gap-2 rounded-full bg-blue-600 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Checkout
                <ArrowRight size={16} />
              </Link>
            </footer>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <ShoppingBag size={36} className="text-slate-300" />
            <p className="mt-4 font-semibold text-slate-800">
              Your cart is empty
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
