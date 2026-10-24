"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserRound,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Eye,
  X,
  ShoppingBag,
  CircleDollarSign,
  CalendarDays,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

const INITIAL_CUSTOMERS = [
  {
    id: "CUS-1001",
    name: "Nusrat Jahan",
    email: "nusrat.jahan@example.com",
    phone: "+880 1712-345678",
    location: "Noakhali, Bangladesh",
    joinedAt: "2026-08-15",
    orders: 8,
    spent: 18450,
    status: "Active",
  },
  {
    id: "CUS-1002",
    name: "Rahim Uddin",
    email: "rahim.uddin@example.com",
    phone: "+880 1812-234567",
    location: "Khulna, Bangladesh",
    joinedAt: "2026-09-02",
    orders: 5,
    spent: 12300,
    status: "Active",
  },
  {
    id: "CUS-1003",
    name: "Sadia Akter",
    email: "sadia.akter@example.com",
    phone: "+880 1912-456789",
    location: "Dhaka, Bangladesh",
    joinedAt: "2026-09-10",
    orders: 3,
    spent: 7560,
    status: "Active",
  },
  {
    id: "CUS-1004",
    name: "Tanvir Hasan",
    email: "tanvir.hasan@example.com",
    phone: "+880 1612-567890",
    location: "Chattogram, Bangladesh",
    joinedAt: "2026-09-21",
    orders: 1,
    spent: 2030,
    status: "Inactive",
  },
  {
    id: "CUS-1005",
    name: "Mehedi Hasan",
    email: "mehedi.hasan@example.com",
    phone: "+880 1512-678901",
    location: "Sylhet, Bangladesh",
    joinedAt: "2026-10-01",
    orders: 6,
    spent: 15680,
    status: "Active",
  },
  {
    id: "CUS-1006",
    name: "Ayesha Rahman",
    email: "ayesha.rahman@example.com",
    phone: "+880 1312-789012",
    location: "Cumilla, Bangladesh",
    joinedAt: "2026-10-12",
    orders: 2,
    spent: 4820,
    status: "Active",
  },
  {
    id: "CUS-1007",
    name: "Fahim Ahmed",
    email: "fahim.ahmed@example.com",
    phone: "+880 1412-890123",
    location: "Rajshahi, Bangladesh",
    joinedAt: "2026-10-15",
    orders: 0,
    spent: 0,
    status: "Inactive",
  },
];

const STATUS_OPTIONS = ["All Statuses", "Active", "Inactive"];

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

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = customers.filter((customer) => {
      const matchesSearch =
        !query ||
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query) ||
        customer.id.toLowerCase().includes(query) ||
        customer.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" || customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.joinedAt) - new Date(a.joinedAt);
      }
      if (sortBy === "oldest") {
        return new Date(a.joinedAt) - new Date(b.joinedAt);
      }
      if (sortBy === "highest-spend") {
        return b.spent - a.spent;
      }
      if (sortBy === "most-orders") {
        return b.orders - a.orders;
      }
      return 0;
    });
  }, [customers, search, statusFilter, sortBy]);

  const activeCount = customers.filter(
    (customer) => customer.status === "Active",
  ).length;
  const inactiveCount = customers.filter(
    (customer) => customer.status === "Inactive",
  ).length;
  const totalSpent = customers.reduce(
    (sum, customer) => sum + customer.spent,
    0,
  );
  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.orders,
    0,
  );

  function toggleCustomerStatus(customerId) {
    const customer = customers.find((item) => item.id === customerId);
    if (!customer) return;

    const nextStatus = customer.status === "Active" ? "Inactive" : "Active";

    setCustomers((current) =>
      current.map((item) =>
        item.id === customerId ? { ...item, status: nextStatus } : item,
      ),
    );

    setSelectedCustomer((current) =>
      current?.id === customerId ? { ...current, status: nextStatus } : current,
    );

    setNotice(`${customer.name} marked as ${nextStatus.toLowerCase()}.`);
    window.setTimeout(() => setNotice(""), 3000);
  }

  function resetFilters() {
    setSearch("");
    setStatusFilter("All Statuses");
    setSortBy("newest");
  }

  return (
    <div className="min-h-screen bg-slate-50/70 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Page heading */}
        <div>
          <div className="mb-1 flex items-center gap-2 text-sm text-slate-500">
            <span>Admin</span>
            <span>/</span>
            <span className="font-medium text-slate-700">Customers</span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Customers
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                View customer profiles and understand their purchase activity.
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-600 shadow-sm">
              <Users size={17} className="text-blue-600" />
              <span>
                <span className="font-semibold text-slate-900">
                  {customers.length}
                </span>{" "}
                total customers
              </span>
            </div>
          </div>
        </div>

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
            label="Total Customers"
            value={customers.length}
            helper="Registered customer accounts"
            icon={<Users size={20} />}
            iconClass="bg-blue-50 text-blue-600"
          />
          <SummaryCard
            label="Active Customers"
            value={activeCount}
            helper="Currently marked as active"
            icon={<UserCheck size={20} />}
            iconClass="bg-emerald-50 text-emerald-600"
          />
          <SummaryCard
            label="Inactive Customers"
            value={inactiveCount}
            helper="Currently marked as inactive"
            icon={<UserX size={20} />}
            iconClass="bg-amber-50 text-amber-600"
          />
          <SummaryCard
            label="Customer Spending"
            value={formatPrice(totalSpent)}
            helper={`${totalOrders} orders across all customers`}
            icon={<CircleDollarSign size={20} />}
            iconClass="bg-violet-50 text-violet-600"
          />
        </div>

        {/* Customers table */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    All Customers
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredCustomers.length} of {customers.length}{" "}
                    customers
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

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                <label className="relative block sm:col-span-2 xl:col-span-1">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search name, email, phone..."
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </label>

                <FilterSelect
                  value={statusFilter}
                  onChange={setStatusFilter}
                  ariaLabel="Filter customers by status"
                  options={STATUS_OPTIONS.map((value) => ({
                    value,
                    label: value,
                  }))}
                />

                <FilterSelect
                  value={sortBy}
                  onChange={setSortBy}
                  ariaLabel="Sort customers"
                  options={[
                    { value: "newest", label: "Newest joined" },
                    { value: "oldest", label: "Oldest joined" },
                    { value: "highest-spend", label: "Highest spending" },
                    { value: "most-orders", label: "Most orders" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-5 py-3.5 font-semibold">Customer</th>
                  <th className="px-5 py-3.5 font-semibold">Location</th>
                  <th className="px-5 py-3.5 font-semibold">Joined</th>
                  <th className="px-5 py-3.5 font-semibold">Orders</th>
                  <th className="px-5 py-3.5 font-semibold">Total Spent</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={customer.name} />
                        <div>
                          <p className="font-semibold text-slate-800">
                            {customer.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {customer.email}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {customer.location}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">
                      {formatDate(customer.joinedAt)}
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-700">
                        {customer.orders}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {formatPrice(customer.spent)}
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedCustomer(customer)}
                          aria-label={`View ${customer.name}`}
                          className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleCustomerStatus(customer.id)}
                          className={`inline-flex h-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition ${
                            customer.status === "Active"
                              ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                              : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                          }`}
                        >
                          {customer.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCustomers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-16 text-center">
                      <div className="mx-auto flex max-w-sm flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Users size={22} />
                        </div>
                        <p className="mt-3 font-semibold text-slate-800">
                          No customers found
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Try another search or reset your filters.
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
            Customer information shown here is sample data. Connect your
            customer API to use real records.
          </div>
        </section>
      </div>

      {/* Customer details modal */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedCustomer(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-modal-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <p className="text-sm text-slate-500">Customer profile</p>
                <h2
                  id="customer-modal-title"
                  className="mt-1 text-xl font-bold text-slate-900"
                >
                  {selectedCustomer.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
                aria-label="Close customer details"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={19} />
              </button>
            </div>

            <div className="space-y-5 px-5 py-5 sm:px-6">
              <div className="flex items-center gap-4 rounded-xl bg-slate-50 p-4">
                <Avatar name={selectedCustomer.name} large />
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900">
                    {selectedCustomer.name}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {selectedCustomer.id}
                  </p>
                  <div className="mt-2">
                    <StatusBadge status={selectedCustomer.status} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <DetailRow
                  icon={<Mail size={17} />}
                  label="Email address"
                  value={selectedCustomer.email}
                />
                <DetailRow
                  icon={<Phone size={17} />}
                  label="Phone number"
                  value={selectedCustomer.phone}
                />
                <DetailRow
                  icon={<MapPin size={17} />}
                  label="Location"
                  value={selectedCustomer.location}
                />
                <DetailRow
                  icon={<CalendarDays size={17} />}
                  label="Joined date"
                  value={formatDate(selectedCustomer.joinedAt)}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Total orders</p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {selectedCustomer.orders}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 p-4">
                  <p className="text-sm text-slate-500">Total spent</p>
                  <p className="mt-2 text-xl font-bold text-slate-900">
                    {formatPrice(selectedCustomer.spent)}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => toggleCustomerStatus(selectedCustomer.id)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                  selectedCustomer.status === "Active"
                    ? "border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {selectedCustomer.status === "Active"
                  ? "Deactivate Customer"
                  : "Activate Customer"}
              </button>
            </div>

            <div className="flex justify-end border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setSelectedCustomer(null)}
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

function Avatar({ name, large = false }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-700 ${
        large ? "h-14 w-14 text-lg" : "h-11 w-11 text-sm"
      }`}
      aria-label={`${name} initials`}
    >
      {initials}
    </div>
  );
}

function StatusBadge({ status }) {
  const active = status === "Active";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-slate-400">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-slate-800">
          {value}
        </p>
      </div>
    </div>
  );
}
