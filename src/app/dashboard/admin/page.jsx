"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock3,
  DollarSign,
  Download,
  Eye,
  LogOut,
  MoreHorizontal,
  Package,
  PackageCheck,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";
import { signOut, useSession } from "@/lib/auth-client";
import { Avatar, Button, Dropdown, Label } from "@heroui/react";
import { MdLogout } from "react-icons/md";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const overviewCards = [
  {
    title: "Total Revenue",
    value: "৳1,24,580",
    change: "+12.8%",
    description: "Compared to last month",
    icon: DollarSign,
    color: "bg-blue-50 text-blue-600",
    positive: true,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2%",
    description: "Compared to last month",
    icon: ShoppingBag,
    color: "bg-violet-50 text-violet-600",
    positive: true,
  },
  {
    title: "Total Products",
    value: "156",
    change: "+4.5%",
    description: "Compared to last month",
    icon: PackageCheck,
    color: "bg-emerald-50 text-emerald-600",
    positive: true,
  },
  {
    title: "Total Customers",
    value: "892",
    change: "+10.4%",
    description: "Compared to last month",
    icon: Users,
    color: "bg-amber-50 text-amber-600",
    positive: true,
  },
];

const salesData = [
  { month: "Jan", revenue: 35, orders: 25 },
  { month: "Feb", revenue: 48, orders: 32 },
  { month: "Mar", revenue: 39, orders: 29 },
  { month: "Apr", revenue: 62, orders: 40 },
  { month: "May", revenue: 52, orders: 36 },
  { month: "Jun", revenue: 76, orders: 48 },
  { month: "Jul", revenue: 60, orders: 43 },
  { month: "Aug", revenue: 85, orders: 56 },
  { month: "Sep", revenue: 68, orders: 45 },
  { month: "Oct", revenue: 92, orders: 62 },
  { month: "Nov", revenue: 78, orders: 54 },
  { month: "Dec", revenue: 100, orders: 70 },
];

const recentOrders = [
  {
    id: "UT-10245831",
    customer: "Rahim Ahmed",
    initials: "RA",
    product: "Wireless Earbuds",
    amount: 1850,
    date: "Oct 24, 2026",
    status: "Pending",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "UT-10245830",
    customer: "Nusrat Jahan",
    initials: "NJ",
    product: "Fast Charging Adapter",
    amount: 950,
    date: "Oct 24, 2026",
    status: "Processing",
    color: "bg-violet-100 text-violet-700",
  },
  {
    id: "UT-10245829",
    customer: "Tanvir Hasan",
    initials: "TH",
    product: "Power Bank 20000mAh",
    amount: 2450,
    date: "Oct 23, 2026",
    status: "Shipped",
    color: "bg-amber-100 text-amber-700",
  },
  {
    id: "UT-10245828",
    customer: "Sadia Islam",
    initials: "SI",
    product: "USB-C Cable",
    amount: 350,
    date: "Oct 23, 2026",
    status: "Delivered",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    id: "UT-10245827",
    customer: "Fahim Hossain",
    initials: "FH",
    product: "Bluetooth Speaker",
    amount: 1650,
    date: "Oct 22, 2026",
    status: "Cancelled",
    color: "bg-red-100 text-red-700",
  },
];

const topProducts = [
  {
    name: "Wireless Earbuds",
    category: "Audio Accessories",
    sold: 248,
    revenue: 186000,
    stock: 42,
    icon: "🎧",
  },
  {
    name: "Fast Charging Adapter",
    category: "Chargers",
    sold: 196,
    revenue: 98000,
    stock: 8,
    icon: "🔌",
  },
  {
    name: "Power Bank 20000mAh",
    category: "Power Accessories",
    sold: 154,
    revenue: 231000,
    stock: 26,
    icon: "🔋",
  },
  {
    name: "USB-C Cable",
    category: "Cables",
    sold: 132,
    revenue: 33000,
    stock: 65,
    icon: "🔗",
  },
];

const statusSummary = [
  { title: "Pending", count: 18, color: "bg-blue-500", percentage: 36 },
  { title: "Processing", count: 12, color: "bg-violet-500", percentage: 24 },
  { title: "Shipped", count: 10, color: "bg-amber-500", percentage: 20 },
  { title: "Delivered", count: 10, color: "bg-emerald-500", percentage: 20 },
];

function formatCurrency(amount) {
  return `৳${amount.toLocaleString("en-US")}`;
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-blue-50 text-blue-700",
    Processing: "bg-violet-50 text-violet-700",
    Shipped: "bg-amber-50 text-amber-700",
    Delivered: "bg-emerald-50 text-emerald-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter()
   const { data: session, isPending, error } = useSession();
  const user = session?.user;

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Logout failed!");
      return;
    }
    toast.success("Logout successful!");
    router.replace("/dashboard/login");
  };

  const [period, setPeriod] = useState("This Year");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  const filteredOrders = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return recentOrders.filter((order) => {
      const matchesSearch =
        !query ||
        order.id.toLowerCase().includes(query) ||
        order.customer.toLowerCase().includes(query) ||
        order.product.toLowerCase().includes(query);

      const matchesStatus =
        selectedStatus === "All Status" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, selectedStatus]);

  return (
    <div className="min-h-screen bg-[#F6F8FC] text-slate-800">
      {/* Page Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Admin</span>
              <ChevronRight size={13} />
              <span className="font-medium text-slate-600">Dashboard</span>
            </div>
            <h1 className="mt-1 truncate text-lg font-bold text-slate-900 sm:text-xl">
              Dashboard Overview
            </h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden md:block">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-48 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white lg:w-64"
              />
            </div>

            <button
              type="button"
              aria-label="Notifications"
              className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50"
            >
              <Bell size={19} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </button>

            <div className="hidden h-9 w-px bg-slate-200 sm:block" />

            <div className="flex items-center gap-2.5 rounded-xl p-1.5">
              <Dropdown>
                <Button aria-label="Menu" className="p-0 w-fit">
                  <Avatar>
                    <Avatar.Image
                      referrerPolicy="no-referrer"
                      alt={user?.name}
                      src={user?.image}
                    />
                    <Avatar.Fallback>{user?.name[0]}</Avatar.Fallback>
                  </Avatar>
                </Button>

                <Dropdown.Popover>
                  <Dropdown.Menu
                    onAction={(key) => console.log(`Selected: ${key}`)}
                  >
                    <Dropdown.Item id="userName" className="pointer-events-none" textValue={user?.name}>
                      <Label className="font-semibold">
                        <p className="font-medium mr-3">
                          Hello, {user?.name.split(" ")[0]}
                        </p>
                      </Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="settings"
                      onClick={() => router.push("/dashboard/admin/settings")}
                      textValue="Settings"
                    >
                      <Label className="cursor-pointer flex gap-2 items-center font-semibold">
                        <Settings className="h-5" />
                        Settings
                      </Label>
                    </Dropdown.Item>

                    <Dropdown.Item
                      id="logout"
                      onClick={handleLogout}
                      textValue="Logout"
                    >
                      <Label className="text-red-600 cursor-pointer flex gap-2 items-center font-semibold">
                        <LogOut className="h-5"/>
                        Logout
                      </Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>

              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-slate-800">
                  {user?.name}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Welcome */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Welcome back, Admin 👋
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Here&apos;s what&apos;s happening with your store today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
            >
              <Plus size={17} />
              Add Product
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Download size={17} />
              Export / Print
            </button>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {overviewCards.map((card) => {
            const Icon = card.icon;
            const ChangeIcon = card.positive ? ArrowUpRight : ArrowDownRight;

            return (
              <article
                key={card.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-6"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {card.title}
                    </p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                      {card.value}
                    </h3>
                  </div>
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.color}`}
                  >
                    <Icon size={23} strokeWidth={1.8} />
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      card.positive ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    <ChangeIcon size={14} />
                    {card.change}
                  </span>
                  <span className="text-xs text-slate-400">
                    {card.description}
                  </span>
                </div>
              </article>
            );
          })}
        </section>

        {/* Sales Chart and Order Summary */}
        <section className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Sales Overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Revenue and order performance
                </p>
              </div>
              <div className="relative">
                <CalendarDays
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={period}
                  onChange={(event) => setPeriod(event.target.value)}
                  className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-blue-400"
                >
                  <option>This Year</option>
                  <option>Last 12 Months</option>
                  <option>This Month</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-5">
              <div>
                <p className="text-xs text-slate-500">Total Revenue</p>
                <p className="mt-1 text-xl font-bold text-slate-900">
                  ৳12,48,500
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Total Orders</p>
                <p className="mt-1 text-xl font-bold text-slate-900">8,642</p>
              </div>
              <div className="ml-auto flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                  <span className="text-xs text-slate-500">Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-400" />
                  <span className="text-xs text-slate-500">Orders</span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex h-[230px]">
                <div className="flex flex-col justify-between pb-7 pr-3 text-right text-[10px] text-slate-400 sm:text-xs">
                  <span>100%</span>
                  <span>75%</span>
                  <span>50%</span>
                  <span>25%</span>
                  <span>0%</span>
                </div>
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-7">
                    {[0, 1, 2, 3, 4].map((line) => (
                      <div
                        key={line}
                        className="w-full border-t border-dashed border-slate-200"
                      />
                    ))}
                  </div>
                  <div className="relative flex h-full items-end justify-between gap-1.5 sm:gap-3">
                    {salesData.map((item) => (
                      <div
                        key={item.month}
                        className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                      >
                        <div className="flex h-[calc(100%-28px)] w-full items-end justify-center gap-0.5 sm:gap-1">
                          <div
                            title={`Revenue: ${item.revenue}%`}
                            className="w-1/2 max-w-5 rounded-t-md bg-blue-600 transition hover:bg-blue-700"
                            style={{ height: `${item.revenue}%` }}
                          />
                          <div
                            title={`Orders: ${item.orders}%`}
                            className="w-1/2 max-w-5 rounded-t-md bg-violet-400 transition hover:bg-violet-500"
                            style={{ height: `${item.orders}%` }}
                          />
                        </div>
                        <span className="mt-3 text-[9px] text-slate-400 sm:text-xs">
                          {item.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-50 p-3">
              <TrendingUp size={17} className="shrink-0 text-emerald-600" />
              <p className="text-xs leading-5 text-emerald-700">
                Sales performance is displayed using sample dashboard data.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Order Status
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Current order distribution
                </p>
              </div>
              <Link
                href="/admin/orders"
                aria-label="View all orders"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-blue-600"
              >
                <MoreHorizontal size={21} />
              </Link>
            </div>

            <div className="mt-7 flex items-center justify-center">
              <div
                className="relative flex h-44 w-44 items-center justify-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#3B82F6 0% 36%, #8B5CF6 36% 60%, #F59E0B 60% 80%, #10B981 80% 100%)",
                }}
              >
                <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                  <span className="text-3xl font-bold text-slate-900">50</span>
                  <span className="mt-1 text-xs text-slate-500">
                    Total Orders
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {statusSummary.map((item) => (
                <div key={item.title}>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${item.color}`}
                      />
                      <span className="text-sm text-slate-600">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">
                      {item.count}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/admin/orders"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              View All Orders
              <ArrowRight size={16} />
            </Link>
          </article>
        </section>

        {/* Recent Orders */}
        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Orders
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review the latest orders placed in your store.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(event) => setSelectedStatus(event.target.value)}
                  className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm text-slate-600 outline-none focus:border-blue-400"
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <ChevronDown
                  size={14}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
              <Link
                href="/admin/orders"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                View All
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div className="px-5 pb-4 md:hidden">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-400"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="border-y border-slate-100 bg-slate-50/80">
                  {[
                    "Order ID",
                    "Customer",
                    "Product",
                    "Date",
                    "Amount",
                    "Status",
                    "Action",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-blue-600">
                        {order.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${order.color}`}
                        >
                          {order.initials}
                        </div>
                        <span className="whitespace-nowrap text-sm font-medium text-slate-700">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-600">
                        {order.product}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {order.date}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-slate-800">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/my-orders/${order.id}`}
                        aria-label={`View order ${order.id}`}
                        className="inline-flex rounded-lg border border-slate-200 p-2 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={16} />
                      </Link>
                    </td>
                  </tr>
                ))}
                {filteredOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-sm text-slate-500"
                    >
                      No orders match your search or selected status.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
            <p className="text-xs text-slate-500">
              Showing {filteredOrders.length} of {recentOrders.length} sample
              orders
            </p>
            <Link
              href="/admin/orders"
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage all orders
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* Top Products and Inventory */}
        <section className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm xl:col-span-2">
            <div className="flex items-center justify-between gap-3 p-5 sm:p-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Top Selling Products
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Products performing well in your store.
                </p>
              </div>
              <Link
                href="/admin/products"
                className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[580px] text-left">
                <thead>
                  <tr className="border-y border-slate-100 bg-slate-50/80">
                    {["Product", "Sold", "Revenue", "Stock"].map((heading) => (
                      <th
                        key={heading}
                        className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topProducts.map((product) => (
                    <tr key={product.name} className="hover:bg-slate-50/70">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-slate-50 text-xl">
                            {product.icon}
                          </div>
                          <div>
                            <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        {product.sold}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                        {formatCurrency(product.revenue)}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`text-sm font-semibold ${product.stock < 10 ? "text-red-600" : "text-emerald-600"}`}
                        >
                          {product.stock} units
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
              <Link
                href="/admin/products"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
              >
                Manage Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Inventory Status
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Sample stock overview
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <Package size={20} />
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Products in stock</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-3xl font-bold text-slate-900">156</span>
                <span className="mb-1 text-xs text-slate-400">
                  sample products
                </span>
              </div>
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full w-[72%] rounded-full bg-blue-600" />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-slate-500">Stock availability</span>
                <span className="font-semibold text-blue-600">72%</span>
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <Clock3 size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Low Stock
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Products need restocking
                    </p>
                  </div>
                </div>
                <span className="rounded-lg bg-red-50 px-2.5 py-1 text-sm font-bold text-red-600">
                  8
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <PackageCheck size={19} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      In Stock
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Products available
                    </p>
                  </div>
                </div>
                <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-600">
                  148
                </span>
              </div>
            </div>

            <Link
              href="/admin/products"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              Manage Inventory
              <ArrowRight size={16} />
            </Link>
          </article>
        </section>

        <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-slate-200 py-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} UniTech Admin Dashboard.</p>
          <p>
            Dashboard UI uses sample data. Connect your backend for live
            statistics.
          </p>
        </footer>
      </main>
    </div>
  );
}
