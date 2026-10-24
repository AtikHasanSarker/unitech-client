"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  CreditCard,
  Download,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

const monthlyData = [
  { month: "May", revenue: 42000, orders: 142 },
  { month: "Jun", revenue: 51000, orders: 168 },
  { month: "Jul", revenue: 46500, orders: 151 },
  { month: "Aug", revenue: 62000, orders: 194 },
  { month: "Sep", revenue: 58500, orders: 183 },
  { month: "Oct", revenue: 74800, orders: 236 },
];

const topProducts = [
  {
    name: "USB-C Fast Charger 25W",
    category: "Chargers",
    sold: 248,
    revenue: 111600,
    share: 92,
  },
  {
    name: "Wireless Earbuds Pro",
    category: "Audio",
    sold: 186,
    revenue: 279000,
    share: 76,
  },
  {
    name: "Braided USB-C Cable",
    category: "Cables",
    sold: 174,
    revenue: 43500,
    share: 65,
  },
  {
    name: "MagSafe Phone Case",
    category: "Cases",
    sold: 132,
    revenue: 66000,
    share: 51,
  },
];

const orderBreakdown = [
  { label: "Delivered", value: 68, color: "#10b981" },
  { label: "Processing", value: 18, color: "#3b82f6" },
  { label: "Shipped", value: 9, color: "#8b5cf6" },
  { label: "Cancelled", value: 5, color: "#f43f5e" },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(amount);

function MetricCard({ title, value, change, positive, icon: Icon, note }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
        </div>
        <span className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <Icon size={21} />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold ${positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
        <span className="text-slate-500">{note}</span>
      </div>
    </article>
  );
}

function RevenueChart({ data }) {
  const max = Math.max(...data.map((item) => item.revenue));
  const chartHeight = 210;
  const chartWidth = 640;
  const left = 46;
  const right = 14;
  const top = 18;
  const bottom = 34;
  const plotHeight = chartHeight - top - bottom;
  const plotWidth = chartWidth - left - right;
  const points = data
    .map((item, index) => {
      const x =
        left +
        (data.length === 1
          ? plotWidth / 2
          : (index / (data.length - 1)) * plotWidth);
      const y = top + plotHeight - (item.revenue / max) * plotHeight;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="h-[230px] min-w-[520px] w-full"
        role="img"
        aria-label="Monthly revenue line chart"
      >
        {[0, 1, 2, 3].map((tick) => {
          const y = top + (plotHeight / 3) * tick;
          const value = max - (max / 3) * tick;
          return (
            <g key={tick}>
              <line
                x1={left}
                y1={y}
                x2={chartWidth - right}
                y2={y}
                stroke="#e2e8f0"
                strokeDasharray="4 4"
              />
              <text
                x={left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10"
                fill="#64748b"
              >
                {`${Math.round(value / 1000)}k`}
              </text>
            </g>
          );
        })}
        <polyline
          points={points}
          fill="none"
          stroke="#2563eb"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {data.map((item, index) => {
          const x =
            left +
            (data.length === 1
              ? plotWidth / 2
              : (index / (data.length - 1)) * plotWidth);
          const y = top + plotHeight - (item.revenue / max) * plotHeight;
          return (
            <g key={item.month}>
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#ffffff"
                stroke="#2563eb"
                strokeWidth="3"
              />
              <text
                x={x}
                y={chartHeight - 10}
                textAnchor="middle"
                fontSize="11"
                fill="#64748b"
              >
                {item.month}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState("6 months");
  const [reportNotice, setReportNotice] = useState("");

  const visibleData = useMemo(() => {
    if (period === "3 months") return monthlyData.slice(-3);
    if (period === "12 months") return monthlyData; // Replace with 12 months of API data when connected.
    return monthlyData;
  }, [period]);

  const totalRevenue = visibleData.reduce((sum, item) => sum + item.revenue, 0);
  const totalOrders = visibleData.reduce((sum, item) => sum + item.orders, 0);

  const handleExport = () => {
    const rows = [
      ["Month", "Revenue (BDT)", "Orders"],
      ...visibleData.map((item) => [item.month, item.revenue, item.orders]),
    ];
    const csv = rows
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "unitech-analytics-report.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setReportNotice("CSV report exported using the current demo data.");
    window.setTimeout(() => setReportNotice(""), 3500);
  };

  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
            <BarChart3 size={17} />
            Business insights
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Analytics
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track store performance, revenue, orders, and product trends.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 shadow-sm">
            <CalendarDays size={17} />
            <span className="sr-only">Report period</span>
            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="bg-transparent font-medium outline-none"
            >
              <option>3 months</option>
              <option>6 months</option>
              <option>12 months</option>
            </select>
          </label>
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>
      </section>

      {reportNotice && (
        <div
          role="status"
          className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          {reportNotice}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change="+18.6%"
          positive
          note="vs. previous period"
          icon={CreditCard}
        />
        <MetricCard
          title="Total Orders"
          value={totalOrders.toLocaleString("en-BD")}
          change="+12.4%"
          positive
          note="vs. previous period"
          icon={ShoppingBag}
        />
        <MetricCard
          title="Products Sold"
          value="1,284"
          change="+8.2%"
          positive
          note="vs. previous period"
          icon={Package}
        />
        <MetricCard
          title="Active Customers"
          value="846"
          change="+5.7%"
          positive
          note="vs. previous period"
          icon={Users}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Revenue Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monthly revenue trend from the selected demo period.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
              Revenue (BDT)
            </div>
          </div>
          <div className="mt-5">
            <RevenueChart data={visibleData} />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
            <div>
              <p className="text-xs text-slate-500">
                Revenue in selected period
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {formatCurrency(totalRevenue)}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Average monthly revenue</p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                {formatCurrency(
                  Math.round(totalRevenue / Math.max(visibleData.length, 1)),
                )}
              </p>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Order Breakdown
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Share of orders by current status.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <div
              className="relative grid h-44 w-44 place-items-center rounded-full"
              style={{
                background: `conic-gradient(${orderBreakdown.map((item, index) => `${item.color} ${orderBreakdown.slice(0, index).reduce((sum, previous) => sum + previous.value, 0)}% ${orderBreakdown.slice(0, index + 1).reduce((sum, previous) => sum + previous.value, 0)}%`).join(", ")}`,
              }}
            >
              <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center">
                <div>
                  <p className="text-2xl font-bold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500">All orders</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {orderBreakdown.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <span className="flex items-center gap-2 text-slate-600">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </span>
                <span className="font-semibold text-slate-900">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Top-Selling Products
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Products ranked by units sold in the demo dataset.
              </p>
            </div>
            <span className="mt-2 w-fit rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600 sm:mt-0">
              Top 4 products
            </span>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[520px] text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3 pr-4 font-semibold">Product</th>
                  <th className="pb-3 pr-4 font-semibold">Units Sold</th>
                  <th className="pb-3 pr-4 font-semibold">Revenue</th>
                  <th className="pb-3 font-semibold">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {topProducts.map((product, index) => (
                  <tr key={product.name}>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-sm font-bold text-blue-700">
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-slate-900">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {product.category}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm font-medium text-slate-700">
                      {product.sold}
                    </td>
                    <td className="py-4 pr-4 text-sm font-semibold text-slate-900">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="py-4">
                      <div className="flex min-w-24 items-center gap-2">
                        <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{ width: `${product.share}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500">
                          {product.share}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-violet-50 p-3 text-violet-600">
              <Activity size={20} />
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Quick Insights
              </h2>
              <p className="text-sm text-slate-500">
                Highlights from sample data
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                Revenue trend
              </p>
              <p className="mt-1 text-sm leading-6 text-emerald-900">
                October has the highest revenue in the displayed period.
              </p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Best seller
              </p>
              <p className="mt-1 text-sm leading-6 text-blue-900">
                USB-C Fast Charger 25W leads by units sold.
              </p>
            </div>
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                Order health
              </p>
              <p className="mt-1 text-sm leading-6 text-amber-900">
                Most orders are marked as delivered in this sample.
              </p>
            </div>
          </div>
        </article>
      </section>

      <p className="text-xs text-slate-400">
        Demo analytics only. Connect your API/database to display live UniTech
        store metrics.
      </p>
    </main>
  );
}
