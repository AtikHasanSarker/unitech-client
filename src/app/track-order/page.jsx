"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Search,
  ShoppingBag,
  Truck,
  Clock3,
  ArrowRight,
  ShieldCheck,
  CircleHelp,
  PackageCheck,
  ChevronRight,
  Mail,
} from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrackOrder = async (e) => {
    e.preventDefault();

    setError("");

    if (!orderId.trim() || !contact.trim()) {
      setError("Please enter your order ID and email or phone number.");
      return;
    }

    setLoading(true);

    try {
      // Connect your order tracking API here.
      // Backend tracking endpoint is not yet specified.

      setError("Order tracking API is not connected yet.");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white px-4 py-10 text-slate-900 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className="text-slate-500 transition-colors hover:text-blue-600"
          >
            Home
          </Link>

          <ChevronRight size={14} className="text-slate-400" />

          <span className="font-semibold text-slate-900">Track Order</span>
        </nav>

        {/* Page Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600">
            <Package size={30} strokeWidth={1.8} />
          </div>

          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-blue-600">
            Order Tracking
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Track Your <span className="text-blue-600">Order</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Stay updated on your purchase. Enter your order details below to
            check your delivery status.
          </p>
        </div>

        {/* Tracking Form */}
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {/* Form Header */}
          <div className="mb-7 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <Search size={20} />
            </div>

            <div>
              <h2 className="font-semibold text-slate-900">Find Your Order</h2>

              <p className="mt-1 text-xs text-slate-500">
                Enter the information used during checkout.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleTrackOrder} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Order Number */}
              <div>
                <label
                  htmlFor="orderId"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Order Number
                </label>

                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="orderId"
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="e.g. UNI-10234"
                    autoComplete="off"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              {/* Email / Phone */}
              <div>
                <label
                  htmlFor="contact"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email or Phone Number
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Email or 01XXXXXXXXX"
                    autoComplete="email"
                    className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-white px-4 py-3 text-sm text-red-600"
              >
                {error}
              </div>
            )}

            {/* Track Button */}
            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 font-semibold text-white transition-all hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Tracking...
                </>
              ) : (
                <>
                  Track Order
                  <Search size={18} />
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <ShieldCheck size={19} className="mt-0.5 shrink-0 text-blue-600" />

            <p className="text-xs leading-6 text-slate-500">
              Your order information is protected. Only the order details
              matching your provided contact information will be displayed.
            </p>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {/* Order Updates */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <Clock3 size={23} />
            </div>

            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Order Updates
            </h3>

            <p className="text-xs leading-5 text-slate-500">
              Check your order progress whenever you need.
            </p>
          </div>

          {/* Delivery Tracking */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <Truck size={23} />
            </div>

            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Delivery Tracking
            </h3>

            <p className="text-xs leading-5 text-slate-500">
              Follow your package from processing to delivery.
            </p>
          </div>

          {/* Customer Support */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
              <CircleHelp size={23} />
            </div>

            <h3 className="mb-1 text-sm font-semibold text-slate-900">
              Need Help?
            </h3>

            <p className="text-xs leading-5 text-slate-500">
              Contact our support team if you need assistance.
            </p>
          </div>
        </div>

        {/* Bottom Support */}
        <div className="mt-10 text-center">
          <p className="text-sm text-slate-500">
            Having trouble finding your order?
          </p>

          <Link
            href="/contact"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            Contact UniTech Support
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </main>
  );
}
