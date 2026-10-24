"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
  X,
  Package,
  Clock3,
  Truck,
  CheckCircle2,
  CircleDollarSign,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  CalendarDays,
  UserRound,
  ShoppingBag,
} from "lucide-react";

const INITIAL_ORDERS = [
  {
    id: "UT-1048",
    customer: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+880 1712-345678",
    date: "2026-10-24",
    items: [
      { name: "Anker PowerCore 20K", quantity: 1, price: 2490 },
      { name: "UGREEN USB-C Cable 100W", quantity: 2, price: 650 },
    ],
    subtotal: 3790,
    shipping: 80,
    total: 3870,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Pending",
    address: "Maijdee, Noakhali, Bangladesh",
  },
  {
    id: "UT-1047",
    customer: "Rahim Uddin",
    email: "rahim.uddin@example.com",
    phone: "+880 1812-234567",
    date: "2026-10-24",
    items: [{ name: "JBL Tune 520BT", quantity: 1, price: 4250 }],
    subtotal: 4250,
    shipping: 80,
    total: 4330,
    paymentMethod: "bKash",
    paymentStatus: "Paid",
    status: "Processing",
    address: "Sonadanga, Khulna, Bangladesh",
  },
  {
    id: "UT-1046",
    customer: "Sadia Akter",
    email: "sadia.akter@example.com",
    phone: "+880 1912-456789",
    date: "2026-10-23",
    items: [{ name: "Baseus Bowie WM02", quantity: 2, price: 1890 }],
    subtotal: 3780,
    shipping: 80,
    total: 3860,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Shipped",
    address: "Uttara, Dhaka, Bangladesh",
  },
  {
    id: "UT-1045",
    customer: "Tanvir Hasan",
    email: "tanvir.hasan@example.com",
    phone: "+880 1612-567890",
    date: "2026-10-22",
    items: [{ name: "Apple 20W USB-C Adapter", quantity: 1, price: 1950 }],
    subtotal: 1950,
    shipping: 80,
    total: 2030,
    paymentMethod: "Card",
    paymentStatus: "Paid",
    status: "Delivered",
    address: "Panchlaish, Chattogram, Bangladesh",
  },
  {
    id: "UT-1044",
    customer: "Mehedi Hasan",
    email: "mehedi.hasan@example.com",
    phone: "+880 1512-678901",
    date: "2026-10-21",
    items: [{ name: "Oraimo Watch 4 Plus", quantity: 1, price: 3290 }],
    subtotal: 3290,
    shipping: 80,
    total: 3370,
    paymentMethod: "Nagad",
    paymentStatus: "Paid",
    status: "Cancelled",
    address: "Zindabazar, Sylhet, Bangladesh",
  },
  {
    id: "UT-1043",
    customer: "Ayesha Rahman",
    email: "ayesha.rahman@example.com",
    phone: "+880 1312-789012",
    date: "2026-10-20",
    items: [{ name: "Anker PowerCore 20K", quantity: 1, price: 2490 }],
    subtotal: 2490,
    shipping: 80,
    total: 2570,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Pending",
    address: "Sadar, Cumilla, Bangladesh",
  },
];

const ORDER_STATUSES = [
  "Pending",
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

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${dateString}T00:00:00`));
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
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [paymentFilter, setPaymentFilter] = useState("All Payments");
  const [dateFilter, setDateFilter] = useState("All Dates");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

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

      const matchesDate =
        dateFilter === "All Dates" ||
        (dateFilter === "Today" && order.date === "2026-10-24") ||
        (dateFilter === "Last 7 Days" &&
          new Date(`${order.date}T00:00:00`) >=
            new Date("2026-10-18T00:00:00"));

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

  function updateOrderStatus(orderId, nextStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, status: nextStatus } : order,
      ),
    );
    setSelectedOrder((current) =>
      current?.id === orderId ? { ...current, status: nextStatus } : current,
    );
    setNotice(`Order ${orderId} status updated to ${nextStatus}.`);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function updatePaymentStatus(orderId, nextStatus) {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId ? { ...order, paymentStatus: nextStatus } : order,
      ),
    );
    setSelectedOrder((current) =>
      current?.id === orderId
        ? { ...current, paymentStatus: nextStatus }
        : current,
    );
    setNotice(`Order ${orderId} payment status updated to ${nextStatus}.`);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All Statuses");
    setPaymentFilter("All Payments");
    setDateFilter("All Dates");
  }

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
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

        {/* Notification */}
        {notice && (
          <div
            role="status"
            className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800"
          >
            <span>{notice}</span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
              className="rounded-md p-1 hover:bg-emerald-100"
            >
              <X size={16} />
            </button>
          </div>
        )}

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
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          aria-label={`View details for order ${order.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={16} />
                          View
                        </button>
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
            Order status changes are temporary until you connect your backend.
          </div>
        </section>
      </div>

      {/* Order details modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedOrder(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-details-title"
            className="my-auto w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm text-slate-500">Order details</p>
                <h2
                  id="order-details-title"
                  className="mt-1 text-xl font-bold text-slate-900"
                >
                  {selectedOrder.id}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Placed on {formatDate(selectedOrder.date)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="max-h-[70vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoCard
                  title="Customer information"
                  icon={<UserRound size={17} />}
                >
                  <p className="font-semibold text-slate-800">
                    {selectedOrder.customer}
                  </p>
                  <p className="mt-2 flex items-start gap-2 break-all text-sm text-slate-500">
                    <Mail size={15} className="mt-0.5 shrink-0" />
                    {selectedOrder.email}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                    <Phone size={15} className="mt-0.5 shrink-0" />
                    {selectedOrder.phone}
                  </p>
                  <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                    <MapPin size={15} className="mt-0.5 shrink-0" />
                    {selectedOrder.address}
                  </p>
                </InfoCard>

                <InfoCard title="Order status" icon={<Truck size={17} />}>
                  <label className="block text-xs font-medium text-slate-500">
                    Fulfillment
                    <select
                      value={selectedOrder.status}
                      onChange={(event) =>
                        updateOrderStatus(selectedOrder.id, event.target.value)
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    >
                      {ORDER_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="mt-4 block text-xs font-medium text-slate-500">
                    Payment status
                    <select
                      value={selectedOrder.paymentStatus}
                      onChange={(event) =>
                        updatePaymentStatus(
                          selectedOrder.id,
                          event.target.value,
                        )
                      }
                      className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    >
                      {PAYMENT_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </label>
                  <p className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <CalendarDays size={14} />
                    {formatDate(selectedOrder.date)}
                  </p>
                </InfoCard>
              </div>

              <section className="overflow-hidden rounded-xl border border-slate-200">
                <div className="border-b border-slate-100 bg-slate-50 px-4 py-3">
                  <h3 className="font-semibold text-slate-800">
                    Items ordered
                  </h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={`${selectedOrder.id}-${item.name}-${index}`}
                      className="flex items-center justify-between gap-4 px-4 py-3.5"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-slate-800">
                        {formatPrice(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t border-slate-100 bg-slate-50/70 px-4 py-4 text-sm">
                  <div className="flex justify-between gap-4 text-slate-500">
                    <span>Subtotal</span>
                    <span>{formatPrice(selectedOrder.subtotal)}</span>
                  </div>
                  <div className="flex justify-between gap-4 text-slate-500">
                    <span>Shipping</span>
                    <span>{formatPrice(selectedOrder.shipping)}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
                    <span>Total</span>
                    <span>{formatPrice(selectedOrder.total)}</span>
                  </div>
                </div>
              </section>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-slate-500">Payment method:</span>
                <span className="font-semibold text-slate-700">
                  {selectedOrder.paymentMethod}
                </span>
                <span
                  className={`ml-auto inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusClasses(selectedOrder.paymentStatus)}`}
                >
                  {selectedOrder.paymentStatus}
                </span>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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

function InfoCard({ title, icon, children }) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span className="text-blue-600">{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}
