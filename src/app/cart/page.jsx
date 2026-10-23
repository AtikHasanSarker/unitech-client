"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag,
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  ArrowRight,
  Tag,
  Truck,
  ShieldCheck,
  PackageCheck,
  TicketPercent,
  X,
  Check,
  ShoppingBasket,
} from "lucide-react";
import Navbar from "@/components/Navbar";

const initialCart = [
  {
    id: "p1",
    name: "Baseus Bowie WM02 Wireless Earbuds",
    brand: "Baseus",
    category: "Earphones",
    price: 1450,
    oldPrice: 1890,
    quantity: 1,
    stock: 18,
    image: "https://placehold.co/300x300/f5f3ff/7c3aed?text=Wireless+Earbuds",
  },
  {
    id: "p2",
    name: "UGREEN 20W USB-C Fast Charger",
    brand: "UGREEN",
    category: "Chargers",
    price: 890,
    oldPrice: 1090,
    quantity: 2,
    stock: 12,
    image: "https://placehold.co/300x300/eff6ff/2563eb?text=Fast+Charger",
  },
  {
    id: "p3",
    name: "Baseus Cafule USB-C Cable",
    brand: "Baseus",
    category: "Cables",
    price: 390,
    oldPrice: 490,
    quantity: 1,
    stock: 25,
    image: "https://placehold.co/300x300/f1f5f9/475569?text=USB-C+Cable",
  },
];

const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

const DEMO_COUPONS = {
  NSTU10: { discount: 0.1, label: "10% off" },
  SAVE50: { discount: 0, flat: 50, label: "৳50 off" },
};

export default function CartPage() {
  const [cart, setCart] = useState(initialCart);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");
  const [notice, setNotice] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const originalTotal = cart.reduce(
    (total, item) => total + (item.oldPrice || item.price) * item.quantity,
    0,
  );

  const productSavings = originalTotal - subtotal;

  const couponDiscount = appliedCoupon
    ? appliedCoupon.discount
      ? Math.round(subtotal * appliedCoupon.discount)
      : Math.min(appliedCoupon.flat || 0, subtotal)
    : 0;

  // Demo delivery policy: free shipping on orders of ৳2,000 or more.
  const deliveryCharge = subtotal === 0 || subtotal >= 2000 ? 0 : 80;

  const total = Math.max(0, subtotal - couponDiscount + deliveryCharge);

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const updateQuantity = (id, amount) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(
                item.stock,
                Math.max(1, item.quantity + amount),
              ),
            }
          : item,
      ),
    );
  };

  const removeItem = (id) => {
    const item = cart.find((product) => product.id === id);

    setCart((current) => current.filter((product) => product.id !== id));

    if (item) {
      setNotice(`${item.name} removed from your demo cart.`);
    }

    setAppliedCoupon(null);
    setCouponMessage("");
  };

  const applyCoupon = (event) => {
    event.preventDefault();

    const code = couponInput.trim().toUpperCase();
    const coupon = DEMO_COUPONS[code];

    if (subtotal === 0) {
      setCouponMessage("Add a product before applying a coupon.");
      setAppliedCoupon(null);
      return;
    }

    if (!coupon) {
      setCouponMessage("Invalid demo coupon code.");
      setAppliedCoupon(null);
      return;
    }

    setAppliedCoupon({ ...coupon, code });
    setCouponMessage(`${code} applied successfully.`);
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMessage("");
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMessage("");
    setNotice("");
  };

  const handleCheckout = () => {
    setNotice("Checkout will be available after checkout integration.");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        {/* Header */}
        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <nav className="mb-5 flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <span className="font-medium text-slate-700">Shopping Cart</span>
            </nav>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Your Selection
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                  Shopping Cart
                </h1>
                <p className="mt-3 text-sm text-slate-500">
                  Review your items before proceeding to checkout.
                </p>
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <ShoppingBag size={18} className="text-blue-600" />
                <span className="text-sm font-semibold text-slate-700">
                  {totalQuantity} {totalQuantity === 1 ? "item" : "items"}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {cart.length === 0 ? (
            /* Empty Cart */
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <ShoppingBasket size={36} strokeWidth={1.6} />
              </div>

              <h2 className="mt-6 text-2xl font-extrabold text-slate-900">
                Your cart is empty
              </h2>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Looks like you haven&apos;t added any products yet. Explore our
                collection to find accessories for your everyday needs.
              </p>

              <Link
                href="/products"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <ShoppingCart size={17} />
                Explore Products
                <ArrowRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_370px] xl:grid-cols-[minmax(0,1fr)_400px] lg:gap-8">
              {/* Cart Items */}
              <div className="min-w-0">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        Cart Items
                      </h2>
                      <p className="mt-1 text-xs text-slate-500">
                        {cart.length} unique{" "}
                        {cart.length === 1 ? "product" : "products"}
                      </p>
                    </div>

                    <button
                      onClick={clearCart}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition hover:text-red-600"
                    >
                      <Trash2 size={14} />
                      Clear cart
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {cart.map((item) => (
                      <article
                        key={item.id}
                        className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-6"
                      >
                        {/* Product image */}
                        <Link
                          href={`/products/${item.id}`}
                          className="relative h-24 w-24 shrink-0 self-start overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-28 sm:w-28"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="112px"
                            className="object-contain p-2"
                          />
                        </Link>

                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {item.brand} · {item.category}
                          </p>

                          <Link
                            href={`/products/${item.id}`}
                            className="mt-1.5 block text-sm font-bold leading-5 text-slate-800 transition hover:text-blue-600 sm:text-base"
                          >
                            {item.name}
                          </Link>

                          <div className="mt-2 flex flex-wrap items-baseline gap-2">
                            <span className="text-base font-extrabold text-slate-900">
                              {formatPrice(item.price)}
                            </span>
                            {item.oldPrice > item.price && (
                              <span className="text-xs text-slate-400 line-through">
                                {formatPrice(item.oldPrice)}
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-xs text-emerald-700">
                            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            In stock (demo)
                          </p>

                          {/* Quantity and remove */}
                          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex h-9 items-center rounded-lg border border-slate-200">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={item.quantity <= 1}
                                aria-label={`Decrease ${item.name} quantity`}
                                className="flex h-8 w-9 items-center justify-center text-slate-500 transition hover:text-blue-600 disabled:opacity-30"
                              >
                                <Minus size={14} />
                              </button>

                              <span className="min-w-7 text-center text-xs font-bold">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={item.quantity >= item.stock}
                                aria-label={`Increase ${item.name} quantity`}
                                className="flex h-8 w-9 items-center justify-center text-slate-500 transition hover:text-blue-600 disabled:opacity-30"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 transition hover:text-red-600"
                            >
                              <Trash2 size={14} />
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Item subtotal */}
                        <div className="border-t border-slate-100 pt-3 text-left sm:min-w-[100px] sm:self-stretch sm:border-0 sm:pt-0 sm:text-right">
                          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                            Subtotal
                          </p>
                          <p className="mt-1 text-base font-extrabold text-slate-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="border-t border-slate-200 bg-slate-50/70 px-5 py-4 sm:px-6">
                    <Link
                      href="/products"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
                    >
                      <ArrowLeft size={16} />
                      Continue shopping
                    </Link>
                  </div>
                </div>

                {/* Shopping benefits */}
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Truck size={19} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Campus Convenience
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Delivery options at checkout
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <ShieldCheck size={19} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Secure Checkout
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Payment integration pending
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <PackageCheck size={19} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Order Support
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Check policies before ordering
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <aside className="lg:sticky lg:top-6">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
                    <h2 className="text-base font-bold text-slate-900">
                      Order Summary
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Review your estimated total.
                    </p>
                  </div>

                  <div className="space-y-4 p-5 sm:p-6">
                    {/* Coupon */}
                    <div>
                      <label
                        htmlFor="coupon"
                        className="mb-2 block text-xs font-bold text-slate-700"
                      >
                        Have a promo code?
                      </label>

                      {appliedCoupon ? (
                        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                          <div className="flex min-w-0 items-center gap-2">
                            <TicketPercent
                              size={18}
                              className="shrink-0 text-emerald-600"
                            />
                            <div className="min-w-0">
                              <p className="truncate text-xs font-bold text-emerald-800">
                                {appliedCoupon.code}
                              </p>
                              <p className="mt-0.5 text-[10px] text-emerald-700">
                                {appliedCoupon.label}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={removeCoupon}
                            aria-label="Remove coupon"
                            className="text-emerald-700 hover:text-red-600"
                          >
                            <X size={17} />
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={applyCoupon} className="flex gap-2">
                          <input
                            id="coupon"
                            value={couponInput}
                            onChange={(e) => setCouponInput(e.target.value)}
                            placeholder="Enter coupon code"
                            className="h-11 min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs uppercase outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                          />
                          <button
                            type="submit"
                            className="rounded-xl border border-blue-200 bg-blue-50 px-3 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
                          >
                            Apply
                          </button>
                        </form>
                      )}

                      {couponMessage && (
                        <p
                          className={`mt-2 text-xs ${
                            appliedCoupon ? "text-emerald-600" : "text-red-500"
                          }`}
                        >
                          {couponMessage}
                        </p>
                      )}

                      {!appliedCoupon && (
                        <p className="mt-2 text-[10px] leading-5 text-slate-400">
                          Demo codes: NSTU10 or SAVE50
                        </p>
                      )}
                    </div>

                    <div className="border-t border-dashed border-slate-200" />

                    {/* Cost breakdown */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">
                          Subtotal ({totalQuantity} items)
                        </span>
                        <span className="font-semibold text-slate-800">
                          {formatPrice(subtotal)}
                        </span>
                      </div>

                      {productSavings > 0 && (
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-slate-500">
                            Product savings
                          </span>
                          <span className="font-semibold text-emerald-600">
                            -{formatPrice(productSavings)}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="text-slate-500">Delivery charge</span>
                        {deliveryCharge === 0 ? (
                          <span className="font-semibold text-emerald-600">
                            Free
                          </span>
                        ) : (
                          <span className="font-semibold text-slate-800">
                            {formatPrice(deliveryCharge)}
                          </span>
                        )}
                      </div>

                      {couponDiscount > 0 && (
                        <div className="flex items-center justify-between gap-3 text-sm">
                          <span className="text-slate-500">
                            Coupon discount
                          </span>
                          <span className="font-semibold text-emerald-600">
                            -{formatPrice(couponDiscount)}
                          </span>
                        </div>
                      )}
                    </div>

                    {subtotal > 0 && subtotal < 2000 && (
                      <div className="rounded-xl bg-blue-50 p-3">
                        <div className="flex items-start gap-2">
                          <Truck
                            size={17}
                            className="mt-0.5 shrink-0 text-blue-600"
                          />
                          <p className="text-xs leading-5 text-slate-600">
                            Add{" "}
                            <span className="font-bold text-blue-700">
                              {formatPrice(2000 - subtotal)}
                            </span>{" "}
                            more to unlock demo free delivery.
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-slate-200" />

                    <div className="flex items-center justify-between gap-3">
                      <span className="text-base font-bold text-slate-900">
                        Estimated total
                      </span>
                      <span className="text-2xl font-extrabold tracking-tight text-slate-950">
                        {formatPrice(total)}
                      </span>
                    </div>

                    <p className="text-[10px] leading-5 text-slate-400">
                      Delivery policy and discounts are placeholders and may
                      change when the real checkout is implemented.
                    </p>

                    <button
                      onClick={handleCheckout}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
                    >
                      Proceed to Checkout
                      <ArrowRight size={17} />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                      <ShieldCheck size={14} />
                      Checkout is not connected yet
                    </div>
                  </div>
                </div>

                {/* Student discount card */}
                <div className="mt-4 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Tag size={17} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        NSTU Student Deals
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        Explore campus offers
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-slate-600">
                    Check the student offers page for available promotions.
                  </p>

                  <Link
                    href="/deals?audience=nstu-students"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800"
                  >
                    Explore student deals
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </aside>
            </div>
          )}
        </section>
      </main>

      {/* Feedback notification */}
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[120] flex max-w-[calc(100vw-40px)] items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-xl"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Check size={17} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-900">Cart update</p>
            <p className="mt-1 text-xs leading-5 text-slate-500">{notice}</p>
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
    </>
  );
}
