"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Package,
  Clock3,
  Truck,
  CircleDollarSign,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import {
  getAllOrders,
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

function safeDateValue(value) {
  if (!value) return null;

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(dateString) {
  const date = safeDateValue(dateString);
  if (!date) return "N/A";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getPhoneFromDeliveryAddress(deliveryAddress) {
  if (typeof deliveryAddress !== "string") return "";

  const match = deliveryAddress.match(/Phone:\s*([^\n]+)/i);
  return match ? match[1].trim() : "";
}

function isSameCalendarDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

function statusClasses(status) {
  const styles = {
    Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
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

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");
  const [dateFilter, setDateFilter] = useState("All Dates");

  useEffect(() => {
    let active = true;
    Promise.all([getAllOrders(), getUsers()])
      .then(([ordersResult, usersResult]) => {
        if (!active) return;
        if (!ordersResult?.success) {
          setLoadError(ordersResult?.message || "Could not load orders.");
          return;
        }

        const usersById = new Map(
          (usersResult?.data || []).map((user) => [user._id, user]),
        );
        setOrders(
          ordersResult.data.map((order) => {
            const user = usersById.get(order.userId);
            const rawAddress = order.deliveryAddress || "";
            const mappedPhone = getPhoneFromDeliveryAddress(rawAddress) || user?.phone || "";

            return {
              id: order._id,
              customer: user?.name || order.userEmail || order.userId,
              email: order.userEmail || user?.email || "",
              phone: mappedPhone,
              date: order.createdAt,
              items: order.items || [],
              subtotal: order.subtotal,
              shipping: order.shippingFee,
              total: order.total,
              paymentMethod: order.paymentMethod,
              paymentStatus: order.paymentStatus || "Pending",
              status: order.status,
              address: rawAddress,
            };
          }),
        );
      })
      .catch(() => {
        if (active) setLoadError("Could not connect to admin order data.");
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastSevenDaysStart = new Date(todayStart);
    lastSevenDaysStart.setDate(todayStart.getDate() - 6);

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.email.toLowerCase().includes(query) ||
        order.phone.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" || order.status === statusFilter;

      const matchesPayment =
        paymentFilter === "All Payments" ||
        order.paymentStatus === paymentFilter;

      const orderDate = safeDateValue(order.date);
      const matchesDate =
        dateFilter === "All Dates" ||
        (!orderDate
          ? false
          : (dateFilter === "Today" && isSameCalendarDay(orderDate, now)) ||
            (dateFilter === "Last 7 Days" &&
              orderDate >= lastSevenDaysStart &&
              orderDate <= todayStart));

      return matchesSearch && matchesStatus && matchesPayment && matchesDate;
    });
  }, [orders, search, statusFilter, paymentFilter, dateFilter]);

  const pendingCount = orders.filter(
    (order) => order.status === "Pending",
  ).length;
  const processingCount = orders.filter(
    (order) => order.status === "Processing",
  ).length;
  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered",
  ).length;
  const revenue = orders
    .filter(
      (order) => order.paymentStatus === "Paid" && order.status !== "Cancelled",
    )
    .reduce((sum, order) => sum + order.total, 0);

  async function updateOrderStatus(orderId, nextStatus) {
    try {
      const result = await saveOrderStatus(orderId, nextStatus);
      if (!result?.success) {
        toast.error(result?.message || "Order status could not be saved.");
        return;
      }
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, status: nextStatus } : order,
        ),
      );
      toast.success(`Order ${orderId} status updated to ${nextStatus}.`);
    } catch {
      toast.error("Order status could not be saved.");
    }
  }

  async function updatePaymentStatus(orderId, nextStatus) {
    try {
      const result = await savePaymentStatus(orderId, nextStatus);
      if (!result?.success) {
        toast.error(result?.message || "Payment status could not be saved.");
        return;
      }
      setOrders((current) =>
        current.map((order) =>
          order.id === orderId ? { ...order, paymentStatus: nextStatus } : order,
        ),
      );
      toast.success(`Order ${orderId} payment status updated to ${nextStatus}.`);
    } catch {
      toast.error("Payment status could not be saved.");
    }
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All Statuses");
    setPaymentFilter("All Payments");
    setDateFilter("All Dates");
  }

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto container space-y-6">
        {(isLoading || loadError) && (
          <div className={`rounded-xl border px-4 py-3 text-sm ${loadError ? "border-amber-200 bg-amber-50 text-amber-900" : "border-slate-200 bg-white text-slate-600"}`}>
            {loadError || "Loading orders..."}
          </div>
        )}
        {/* Page heading */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <span>/</span>
            <span className="font-medium text-slate-700">Orders</span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Orders
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Track orders, update statuses, and review customer purchases.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 shadow-sm">
              <Package size={17} className="text-blue-600" />
              <span>
                <span className="font-semibold text-slate-900">
                  {orders.length}
                </span>{" "}
                total orders
              </span>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Total Orders"
            value={orders.length}
            helper="All orders received"
            icon={<ShoppingBag size={20} />}
            iconClass="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            label="Pending Orders"
            value={pendingCount}
            helper="Waiting for confirmation"
            icon={<Clock3 size={20} />}
            iconClass="bg-amber-50 text-amber-600"
          />
          <SummaryCard
            label="Processing Orders"
            value={processingCount}
            helper="Being prepared for shipping"
            icon={<Truck size={20} />}
            iconClass="bg-violet-50 text-violet-600"
          />
          <SummaryCard
            label="Paid Revenue"
            value={formatPrice(revenue)}
            helper={`${deliveredCount} delivered orders`}
            icon={<CircleDollarSign size={20} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Filters and table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">All Orders</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredOrders.length} of {orders.length} orders
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 self-start text-sm font-medium text-slate-500 transition hover:text-blue-600 sm:self-auto"
                >
                  <SlidersHorizontal size={16} />
                  Reset filters
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <label className="relative block sm:col-span-2 xl:col-span-1">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search order, customer..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </label>

                <FilterSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  ariaLabel="Filter orders by status"
                  options={["All Statuses", ...ORDER_STATUSES].map((value) => ({
                    value,
                    label: value,
                  }))}
                />
                <FilterSelect
                  value={paymentFilter}
                  onChange={setPaymentFilter}
                  ariaLabel="Filter orders by payment status"
                  options={["All Payments", ...PAYMENT_STATUSES].map(
                    (value) => ({ value, label: value }),
                  )}
                />
                <FilterSelect
                  value={dateFilter}
                  onChange={setDateFilter}
                  ariaLabel="Filter orders by date"
                  options={[
                    { value: "All Dates", label: "All Dates" },
                    { value: "Today", label: "Today" },
                    { value: "Last 7 Days", label: "Last 7 Days" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5 font-semibold">Order</th>
                  <th className="px-5 py-3.5 font-semibold">Customer</th>
                  <th className="px-5 py-3.5 font-semibold">Date</th>
                  <th className="px-5 py-3.5 font-semibold">Total</th>
                  <th className="px-5 py-3.5 font-semibold">Payment</th>
                  <th className="px-5 py-3.5 font-semibold">Order Status</th>
                  <th className="px-5 py-3.5 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-800">{order.id}</p>
                      <p className="mt-1 text-xs text-slate-400">
                        {order.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}{" "}
                        items
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-slate-800">
                        {order.customer}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {order.email}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {formatPrice(order.total)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses(order.paymentStatus)}`}
                        >
                          {order.paymentStatus}
                        </span>
                        <p className="text-xs text-slate-500">
                          {order.paymentMethod}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={order.status}
                        onChange={(event) =>
                          updateOrderStatus(order.id, event.target.value)
                        }
                        aria-label={`Update status for order ${order.id}`}
                        className={`max-w-36 cursor-pointer rounded-full border-0 py-1.5 pl-3 pr-8 text-xs font-semibold outline-none ring-1 ring-inset focus:ring-2 focus:ring-blue-300 ${statusClasses(order.status)}`}
                      >
                        {ORDER_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end">
                        <Link
                          href={`/dashboard/admin/orders/${encodeURIComponent(order.id)}`}
                          aria-label={`View details for order ${order.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Package size={22} />
                        </div>
                        <p className="mt-3 font-semibold text-slate-800">
                          No orders found
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try another search term or reset your filters.
                        </p>
                        <button
                          type="button"
                          onClick={resetFilters}
                          className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                        >
                          Reset filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
            Order and payment status changes are saved to the backend.
          </div>
        </section>
      </div>

    </div>
  );
}

function SummaryCard({ label, value, helper, icon, iconClass }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>
      </div>
      <p className="mt-3 text-xs text-slate-500">{helper}</p>
    </div>
  );
}

function FilterSelect({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={ariaLabel}
        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={15}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}
