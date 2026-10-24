"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  User,
  CalendarDays,
  CreditCard,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  Headphones,
  ShoppingBag,
  ClipboardList,
} from "lucide-react";

const demoOrders = [
  {
    id: "UT-10245831",
    date: "2026-10-22T10:30:00",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Paid on Delivery",
    customer: {
      name: "Atik Hasan",
      phone: "01XXXXXXXXX",
      address: "NSTU Campus, Noakhali, Bangladesh",
    },
    deliveryType: "NSTU Campus",
    deliveryFee: 30,
    subtotal: 1220,
    total: 1250,
    items: [
      {
        id: "p1",
        name: "Wireless Bluetooth Earbuds",
        image: "https://placehold.co/120x120/DBEAFE/1D4ED8?text=Earbuds",
        price: 950,
        quantity: 1,
      },
      {
        id: "p3",
        name: "Fast Charging USB-C Cable",
        image: "https://placehold.co/120x120/EDE9FE/6D28D9?text=Cable",
        price: 270,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        description: "Your order was successfully submitted.",
        date: "22 Oct 2026, 10:30 AM",
        completed: true,
      },
      {
        title: "Order Confirmed",
        description: "Your order was confirmed by UniTech.",
        date: "22 Oct 2026, 11:00 AM",
        completed: true,
      },
      {
        title: "Processing",
        description: "Your items were prepared for delivery.",
        date: "22 Oct 2026, 02:00 PM",
        completed: true,
      },
      {
        title: "Shipped",
        description: "Your order was sent for delivery.",
        date: "23 Oct 2026, 09:00 AM",
        completed: true,
      },
      {
        title: "Delivered",
        description: "Your order was delivered successfully.",
        date: "23 Oct 2026, 01:30 PM",
        completed: true,
      },
    ],
  },
  {
    id: "UT-10245719",
    date: "2026-10-20T15:45:00",
    status: "Processing",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Payment Due on Delivery",
    customer: {
      name: "Atik Hasan",
      phone: "01XXXXXXXXX",
      address: "NSTU Campus, Noakhali, Bangladesh",
    },
    deliveryType: "NSTU Campus",
    deliveryFee: 30,
    subtotal: 1650,
    total: 1680,
    items: [
      {
        id: "p4",
        name: "20000mAh Power Bank",
        image: "https://placehold.co/120x120/DCFCE7/15803D?text=Power+Bank",
        price: 1650,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        description: "Your order was successfully submitted.",
        date: "20 Oct 2026, 03:45 PM",
        completed: true,
      },
      {
        title: "Order Confirmed",
        description: "Your order was confirmed by UniTech.",
        date: "20 Oct 2026, 04:15 PM",
        completed: true,
      },
      {
        title: "Processing",
        description: "Your items are being prepared.",
        date: "20 Oct 2026, 05:00 PM",
        completed: true,
      },
      {
        title: "Shipped",
        description: "Your order will appear here when shipped.",
        date: null,
        completed: false,
      },
      {
        title: "Delivered",
        description: "Delivery confirmation will appear here.",
        date: null,
        completed: false,
      },
    ],
  },
  {
    id: "UT-10245602",
    date: "2026-10-18T12:15:00",
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Payment Due on Delivery",
    customer: {
      name: "Atik Hasan",
      phone: "01XXXXXXXXX",
      address: "NSTU Campus, Noakhali, Bangladesh",
    },
    deliveryType: "Outside Campus",
    deliveryFee: 100,
    subtotal: 750,
    total: 850,
    items: [
      {
        id: "p2",
        name: "20W Fast Charger",
        image: "https://placehold.co/120x120/FEE2E2/B91C1C?text=Charger",
        price: 750,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        description: "Your order is awaiting confirmation.",
        date: "18 Oct 2026, 12:15 PM",
        completed: true,
      },
      {
        title: "Order Confirmed",
        description: "Confirmation is pending.",
        date: null,
        completed: false,
      },
      {
        title: "Processing",
        description: "Your order has not started processing.",
        date: null,
        completed: false,
      },
      {
        title: "Shipped",
        description: "Shipping information will appear here.",
        date: null,
        completed: false,
      },
      {
        title: "Delivered",
        description: "Delivery confirmation will appear here.",
        date: null,
        completed: false,
      },
    ],
  },
  {
    id: "UT-10245540",
    date: "2026-10-15T09:00:00",
    status: "Cancelled",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "No Payment Required",
    customer: {
      name: "Atik Hasan",
      phone: "01XXXXXXXXX",
      address: "NSTU Campus, Noakhali, Bangladesh",
    },
    deliveryType: "NSTU Campus",
    deliveryFee: 30,
    subtotal: 450,
    total: 480,
    items: [
      {
        id: "p3",
        name: "Fast Charging USB-C Cable",
        image: "https://placehold.co/120x120/EDE9FE/6D28D9?text=Cable",
        price: 450,
        quantity: 1,
      },
    ],
    timeline: [
      {
        title: "Order Placed",
        description: "Your order was submitted.",
        date: "15 Oct 2026, 09:00 AM",
        completed: true,
      },
      {
        title: "Cancelled",
        description: "This order has been cancelled.",
        date: "15 Oct 2026, 10:00 AM",
        completed: true,
      },
    ],
  },
];

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Confirmed: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Processing: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Shipped: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Cancelled: "bg-red-50 text-red-700 ring-red-600/20",
};

function formatDate(dateString) {
  if (!dateString) return "Awaiting update";

  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>

        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>

      {children}
    </section>
  );
}

function OrderTimeline({ order }) {
  const isCancelled = order.status === "Cancelled";

  return (
    <SectionCard icon={ClipboardList} title="Order Tracking">
      <div className="relative">
        {order.timeline.map((step, index) => {
          const isLast = index === order.timeline.length - 1;
          const isCurrent =
            step.completed &&
            !isCancelled &&
            (isLast || !order.timeline[index + 1]?.completed);

          return (
            <div key={step.title} className="relative flex gap-4 pb-7 last:pb-0">
              {!isLast && (
                <div
                  className={`absolute left-[15px] top-8 h-[calc(100%-12px)] w-0.5 ${
                    step.completed && order.timeline[index + 1]?.completed
                      ? "bg-emerald-400"
                      : "bg-slate-200"
                  }`}
                />
              )}

              <div
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  isCancelled && step.title === "Cancelled"
                    ? "bg-red-100 text-red-600"
                    : step.completed
                      ? "bg-emerald-100 text-emerald-600"
                      : "border-2 border-slate-200 bg-white text-slate-400"
                }`}
              >
                {isCancelled && step.title === "Cancelled" ? (
                  <XCircle size={17} />
                ) : step.completed ? (
                  <CheckCircle2 size={17} />
                ) : (
                  <Clock3 size={16} />
                )}
              </div>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3
                    className={`text-sm font-bold ${
                      step.completed ? "text-slate-900" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {step.date && (
                    <span className="text-xs text-slate-500">
                      {step.date}
                    </span>
                  )}
                </div>

                <p
                  className={`mt-1 text-sm leading-5 ${
                    step.completed ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {step.description}
                </p>

                {isCurrent && (
                  <span className="mt-2 inline-block rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    Current Status
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = Array.isArray(params.id) ? params.id[0] : params.id;

  const order = demoOrders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
            <Package size={36} />
          </div>

          <h1 className="mt-6 text-2xl font-extrabold text-slate-900">
            Order Not Found
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            We could not find an order matching this ID. Check the order ID or
            return to your orders list.
          </p>

          <Link
            href="/my-orders"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={17} />
            Back to My Orders
          </Link>
        </div>
      </main>
    );
  }

  const totalItems = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const isCancelled = order.status === "Cancelled";

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Page Header */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
          <Link
            href="/my-orders"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
          >
            <ArrowLeft size={17} />
            Back to My Orders
          </Link>

          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  Order Details
                </h1>

                <span
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
                    statusStyles[order.status] || statusStyles.Pending
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-500">
                Order ID:{" "}
                <span className="font-bold text-slate-800">{order.id}</span>
              </p>

              <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={15} />
                Placed on {formatDate(order.date)}
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600 sm:self-auto"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Demo Notice */}
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
          <strong>Demo data:</strong> This order information and tracking
          timeline are sample data. Production order details must be fetched
          from the backend after verifying the logged-in customer&apos;s access.
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Items */}
            <SectionCard icon={Package} title="Items Ordered">
              <div className="space-y-5">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-slate-100 pb-5 last:border-0 last:pb-0"
                  >
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-24 sm:w-24">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold leading-6 text-slate-900 sm:text-base">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-2 text-sm font-semibold text-slate-800">
                        ৳{item.price.toLocaleString("en-BD")} each
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-sm font-extrabold text-slate-900 sm:text-base">
                        ৳
                        {(item.price * item.quantity).toLocaleString("en-BD")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
                <span className="text-slate-500">Total Items</span>
                <span className="font-bold text-slate-900">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
            </SectionCard>

            {/* Tracking */}
            <OrderTimeline order={order} />

            {/* Delivery Address */}
            <SectionCard icon={MapPin} title="Delivery Information">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <User size={18} className="mt-0.5 shrink-0 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-500">Customer Name</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {order.customer.name}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Phone
                    size={18}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <div>
                    <p className="text-xs text-slate-500">Mobile Number</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {order.customer.phone}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <div>
                    <p className="text-xs text-slate-500">Delivery Address</p>
                    <p className="mt-1 text-sm leading-6 text-slate-800">
                      {order.customer.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Truck
                    size={18}
                    className="mt-0.5 shrink-0 text-slate-400"
                  />
                  <div>
                    <p className="text-xs text-slate-500">Delivery Option</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {order.deliveryType}
                    </p>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Right Column */}
          <aside className="space-y-6 lg:sticky lg:top-6">
            {/* Price Summary */}
            <SectionCard icon={ClipboardList} title="Order Summary">
              <div className="space-y-4">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-medium text-slate-900">
                    ৳{order.subtotal.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-slate-500">Delivery Fee</span>
                  <span className="font-medium text-slate-900">
                    ৳{order.deliveryFee.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-bold text-slate-900">
                      Total Amount
                    </span>
                    <span className="text-xl font-extrabold text-blue-600">
                      ৳{order.total.toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* Payment */}
            <SectionCard icon={CreditCard} title="Payment Information">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={19} className="text-emerald-600" />
                  <p className="text-sm font-bold text-emerald-900">
                    {order.paymentMethod}
                  </p>
                </div>

                <p className="mt-2 text-xs leading-5 text-emerald-800">
                  {order.paymentStatus === "Paid on Delivery"
                    ? "Payment was collected when the order was delivered."
                    : order.paymentStatus === "No Payment Required"
                      ? "No payment is required for this cancelled order."
                      : "Pay in cash when your order is delivered."}
                </p>
              </div>

              <div className="mt-4 flex justify-between gap-3 text-sm">
                <span className="text-slate-500">Payment Status</span>
                <span className="text-right text-xs font-semibold text-slate-800">
                  {order.paymentStatus}
                </span>
              </div>
            </SectionCard>

            {/* Support */}
            <div className="rounded-2xl bg-slate-900 p-5 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                  <Headphones size={21} />
                </div>

                <div>
                  <h3 className="font-bold">Need Help?</h3>
                  <p className="mt-1 text-xs text-slate-300">
                    Questions about this order?
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-300">
                Contact our support team for assistance with your order or
                delivery.
              </p>

              <Link
                href="/contact"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-blue-50"
              >
                Contact Support
              </Link>
            </div>

            {isCancelled && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800">
                <div className="flex items-center gap-2 font-bold">
                  <XCircle size={18} />
                  Order Cancelled
                </div>
                <p className="mt-2">
                  This order is cancelled. Contact support if you need more
                  information.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}