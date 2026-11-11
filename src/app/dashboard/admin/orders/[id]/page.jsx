"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  Mail,
  MapPin,
  Package,
  Phone,
  Truck,
  UserRound,
} from "lucide-react";
import {
  getOrderById,
  updateOrderStatus as saveOrderStatus,
  updatePaymentStatus as savePaymentStatus,
} from "@/lib/api/order";
import { getUsers } from "@/lib/api/user";

const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];
const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

function formatPrice(value) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatDate(value) {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function parseDeliveryAddress(value) {
  if (typeof value !== "string") return {};

  return Object.fromEntries(
    value
      .split("\n")
      .map((line) => {
        const separator = line.indexOf(":");
        return separator === -1
          ? null
          : [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      })
      .filter(Boolean),
  );
}

function statusClasses(status) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
    Confirmed: "bg-cyan-50 text-cyan-700 ring-cyan-600/20",
    Processing: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Shipped: "bg-violet-50 text-violet-700 ring-violet-600/20",
    Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Cancelled: "bg-red-50 text-red-700 ring-red-600/20",
    Paid: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    Failed: "bg-red-50 text-red-700 ring-red-600/20",
    Refunded: "bg-violet-50 text-violet-700 ring-violet-600/20",
  };
  return styles[status] || "bg-slate-100 text-slate-600 ring-slate-500/10";
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses(status)}`}
    >
      {status || "Unknown"}
    </span>
  );
}

function DetailCard({ title, icon, children }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-900">
        <span className="text-blue-600">{icon}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function AdminOrderDetailsPage() {
  const params = useParams();
  const orderId = params.id;
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    Promise.all([getOrderById(orderId), getUsers()])
      .then(([orderResult, usersResult]) => {
        if (!active) return;
        if (!orderResult?.success || !orderResult.data) {
          setLoadError(orderResult?.message || "Could not load this order.");
          return;
        }

        const savedOrder = orderResult.data;
        const address = parseDeliveryAddress(savedOrder.deliveryAddress);
        const user = (usersResult?.data || []).find(
          (entry) => entry._id === savedOrder.userId,
        );
        const items = Array.isArray(savedOrder.items) ? savedOrder.items : [];

        setOrder({
          id: savedOrder._id,
          customer: address.Name || user?.name || savedOrder.userEmail || "Customer",
          email: savedOrder.userEmail || user?.email || "",
          phone: address.Phone || user?.phone || "",
          address: address.Address || savedOrder.deliveryAddress || "",
          deliveryType: address.Delivery || "",
          note: address.Note || "",
          date: savedOrder.createdAt,
          items,
          subtotal: savedOrder.subtotal,
          shipping: savedOrder.shippingFee,
          total: savedOrder.total,
          paymentMethod: savedOrder.paymentMethod || "Not recorded",
          paymentStatus: savedOrder.paymentStatus || "Pending",
          status: savedOrder.status || "Pending",
        });
      })
      .catch(() => {
        if (active) setLoadError("Could not connect to order data.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [orderId]);

  async function updateStatus(field, status) {
    const saveStatus =
      field === "status" ? saveOrderStatus : savePaymentStatus;

    try {
      const result = await saveStatus(orderId, status);
      if (!result?.success) {
        toast.error(result?.message || "Order status could not be saved.");
        return;
      }

      setOrder((current) => ({ ...current, [field]: status }));
      toast.success("Order updated successfully.");
    } catch {
      toast.error("Order status could not be saved.");
    }
  }

  if (isLoading || !order) {
    return (
      <main className="min-h-screen bg-slate-50/70 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/dashboard/admin/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={16} />
            Back to orders
          </Link>
          <div
            role={loadError ? "alert" : "status"}
            className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
              loadError
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            {loadError || "Loading order details..."}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link
          href="/dashboard/admin/orders"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={16} />
          Back to orders
        </Link>

        <header className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm text-slate-500">Order details</p>
            <h1 className="mt-1 break-all text-2xl font-bold tracking-tight text-slate-900">
              {order.id}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={15} />
              Placed {formatDate(order.date)}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          <DetailCard title="Customer information" icon={<UserRound size={18} />}>
            <p className="font-semibold text-slate-900">{order.customer}</p>
            <p className="mt-3 flex items-start gap-2 break-all text-sm text-slate-600">
              <Mail size={16} className="mt-0.5 shrink-0 text-slate-400" />
              {order.email || "Email not provided"}
            </p>
            <p className="mt-2 flex items-start gap-2 text-sm text-slate-600">
              <Phone size={16} className="mt-0.5 shrink-0 text-slate-400" />
              {order.phone || "Phone not provided"}
            </p>
            <p className="mt-2 flex items-start gap-2 whitespace-pre-line text-sm text-slate-600">
              <MapPin size={16} className="mt-0.5 shrink-0 text-slate-400" />
              {order.address || "Address not provided"}
            </p>
            {order.deliveryType && (
              <p className="mt-3 text-sm text-slate-500">
                Delivery: {order.deliveryType}
              </p>
            )}
            {order.note && (
              <p className="mt-2 text-sm text-slate-500">Note: {order.note}</p>
            )}
          </DetailCard>

          <DetailCard title="Order & payment status" icon={<Truck size={18} />}>
            <label className="block text-sm font-medium text-slate-600">
              Order status
              <select
                value={order.status}
                onChange={(event) => updateStatus("status", event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-4 block text-sm font-medium text-slate-600">
              Payment status
              <select
                value={order.paymentStatus}
                onChange={(event) =>
                  updateStatus("paymentStatus", event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              >
                {PAYMENT_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
              <span className="text-slate-500">Payment method</span>
              <span className="font-medium text-slate-800">
                {order.paymentMethod}
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-500">Payment</span>
              <StatusBadge status={order.paymentStatus} />
            </div>
          </DetailCard>
        </div>

        <DetailCard title="Items ordered" icon={<Package size={18} />}>
          {order.items.length ? (
            <div className="divide-y divide-slate-100">
              {order.items.map((item, index) => (
                <div
                  key={`${item.productId || item.name || "item"}-${index}`}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {item.name || item.productName || "Product"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Qty: {item.quantity || 0} × {formatPrice(item.price)}
                    </p>
                  </div>
                  <p className="shrink-0 font-semibold text-slate-800">
                    {formatPrice(Number(item.quantity || 0) * Number(item.price || 0))}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">No item details available.</p>
          )}

          <div className="mt-4 space-y-3 border-t border-slate-100 pt-4 text-sm">
            <div className="flex justify-between gap-4 text-slate-500">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between gap-4 text-slate-500">
              <span>Shipping</span>
              <span>{formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
              <span className="flex items-center gap-2">
                <CircleDollarSign size={17} />
                Total
              </span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </DetailCard>
      </div>
    </main>
  );
}
