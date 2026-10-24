"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import {
  Package,
  Search,
  ShoppingBag,
  ArrowRight,
  CalendarDays,
  MapPin,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  RefreshCw,
  ChevronDown,
} from "lucide-react";

const demoOrders = [
  {
    id: "UT-10245831",
    date: "2026-10-22T10:30:00",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    deliveryType: "NSTU Campus",
    total: 1250,
    items: [
      {
        id: "p1",
        name: "Wireless Bluetooth Earbuds",
        image: "https://placehold.co/100x100/DBEAFE/1D4ED8?text=Earbuds",
        price: 950,
        quantity: 1,
      },
      {
        id: "p3",
        name: "Fast Charging USB-C Cable",
        image: "https://placehold.co/100x100/EDE9FE/6D28D9?text=Cable",
        price: 300,
        quantity: 1,
      },
    ],
  },
  {
    id: "UT-10245719",
    date: "2026-10-20T15:45:00",
    status: "Processing",
    paymentMethod: "Cash on Delivery",
    deliveryType: "NSTU Campus",
    total: 1650,
    items: [
      {
        id: "p4",
        name: "20000mAh Power Bank",
        image: "https://placehold.co/100x100/DCFCE7/15803D?text=Power+Bank",
        price: 1650,
        quantity: 1,
      },
    ],
  },
  {
    id: "UT-10245602",
    date: "2026-10-18T12:15:00",
    status: "Pending",
    paymentMethod: "Cash on Delivery",
    deliveryType: "Outside Campus",
    total: 750,
    items: [
      {
        id: "p2",
        name: "20W Fast Charger",
        image: "https://placehold.co/100x100/FEE2E2/B91C1C?text=Charger",
        price: 750,
        quantity: 1,
      },
    ],
  },
  {
    id: "UT-10245540",
    date: "2026-10-15T09:00:00",
    status: "Cancelled",
    paymentMethod: "Cash on Delivery",
    deliveryType: "NSTU Campus",
    total: 450,
    items: [
      {
        id: "p3",
        name: "Fast Charging USB-C Cable",
        image: "https://placehold.co/100x100/EDE9FE/6D28D9?text=Cable",
        price: 450,
        quantity: 1,
      },
    ],
  },
];

const statusConfig = {
  Pending: {
    label: "Pending",
    icon: Clock3,
    className: "bg-amber-50 text-amber-700 ring-amber-600/20",
    description: "Waiting for order confirmation",
  },
  Confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className: "bg-blue-50 text-blue-700 ring-blue-600/20",
    description: "Your order has been confirmed",
  },
  Processing: {
    label: "Processing",
    icon: RefreshCw,
    className: "bg-violet-50 text-violet-700 ring-violet-600/20",
    description: "Your order is being prepared",
  },
  Shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    description: "Your order is on its way",
  },
  Delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    description: "Your order has been delivered",
  },
  Cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-700 ring-red-600/20",
    description: "This order was cancelled",
  },
};

const filters = [
  "All Orders",
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function OrderStatus({ status }) {
  const config = statusConfig[status] || statusConfig.Pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${config.className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  );
}

function OrderCard({ order }) {
  const totalItems = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const config = statusConfig[order.status] || statusConfig.Pending;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/40">
      {/* Order Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/60 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <div>
            <p className="text-xs text-slate-500">Order ID</p>
            <p className="mt-1 text-sm font-bold text-slate-900">
              {order.id}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Order Date</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-medium text-slate-700">
              <CalendarDays size={14} className="text-slate-400" />
              {formatDate(order.date)}
            </p>
          </div>
        </div>

        <OrderStatus status={order.status} />
      </div>

      {/* Order Items */}
      <div className="space-y-4 px-5 py-5 sm:px-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                className="h-full w-full object-contain p-1"
              />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
                {item.name}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Quantity: {item.quantity}
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-900">
                ৳{(item.price * item.quantity).toLocaleString("en-BD")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Footer */}
      <div className="flex flex-col gap-4 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="grid grid-cols-2 gap-5 sm:gap-8">
          <div>
            <p className="text-xs text-slate-500">Total Items</p>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">Total Amount</p>
            <p className="mt-1 text-lg font-extrabold text-blue-600">
              ৳{order.total.toLocaleString("en-BD")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/my-orders/${order.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            View Details
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {order.status !== "Delivered" && order.status !== "Cancelled" && (
        <div className="flex items-center gap-2 border-t border-slate-100 bg-blue-50/50 px-5 py-3 text-xs text-blue-800 sm:px-6">
          <Clock3 size={15} className="shrink-0" />
          {config.description}
        </div>
      )}
    </article>
  );
}

export default function MyOrdersPage() {
  const [orders] = useState(demoOrders);
  const [activeFilter, setActiveFilter] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (activeFilter !== "All Orders") {
      result = result.filter((order) => order.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();

      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.items.some((item) =>
            item.name.toLowerCase().includes(query)
          )
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [orders, activeFilter, searchQuery, sortOrder]);

  const statusCounts = useMemo(() => {
    const counts = { "All Orders": orders.length };

    for (const order of orders) {
      counts[order.status] = (counts[order.status] || 0) + 1;
    }

    return counts;
  }, [orders]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Page Heading */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                <Link href="/" className="transition hover:text-blue-600">
                  Home
                </Link>
                <span>/</span>
                <span className="font-medium text-slate-800">My Orders</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                My Orders
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                Track your purchases, check order status, and review your
                UniTech shopping history.
              </p>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700 sm:self-center"
            >
              <ShoppingBag size={18} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Demo Notice */}
        <div className="mb-6 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <Package size={20} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-bold">Demo Orders</p>
            <p className="mt-1 leading-6">
              These are sample orders for UI demonstration. Real customer
              orders will appear here after backend and database integration.
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Total Orders</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              {orders.length}
            </p>
            <p className="mt-1 text-xs text-slate-400">All purchases</p>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-5">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="mt-2 text-3xl font-extrabold text-amber-600">
              {statusCounts.Pending || 0}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Awaiting confirmation
            </p>
          </div>

          <div className="rounded-2xl border border-violet-100 bg-white p-5">
            <p className="text-sm text-slate-500">Processing</p>
            <p className="mt-2 text-3xl font-extrabold text-violet-600">
              {statusCounts.Processing || 0}
            </p>
            <p className="mt-1 text-xs text-slate-400">Being prepared</p>
          </div>

          <div className="rounded-2xl border border-emerald-100 bg-white p-5">
            <p className="text-sm text-slate-500">Delivered</p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-600">
              {statusCounts.Delivered || 0}
            </p>
            <p className="mt-1 text-xs text-slate-400">Successfully received</p>
          </div>
        </div>

        {/* Search and Sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by Order ID or product name..."
              className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="relative sm:w-52">
            <select
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
              aria-label="Sort orders"
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Status Filters */}
        <div className="mb-7 overflow-x-auto pb-2">
          <div className="flex min-w-max items-center gap-2">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                  }`}
                >
                  {filter}
                  <span
                    className={`ml-2 text-xs ${
                      isActive ? "text-blue-100" : "text-slate-400"
                    }`}
                  >
                    {statusCounts[filter] || 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Order List */}
        <div className="space-y-5">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Package size={30} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No orders found
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                No orders match your current search or filter. Try a different
                search term or choose another status.
              </p>

              <button
                type="button"
                onClick={() => {
                  setActiveFilter("All Orders");
                  setSearchQuery("");
                }}
                className="mt-5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom Support */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl bg-slate-900 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="text-lg font-bold text-white">
              Need help with your order?
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              Contact our support team if you have questions about delivery or
              order status.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-blue-50"
          >
            Contact Support
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}