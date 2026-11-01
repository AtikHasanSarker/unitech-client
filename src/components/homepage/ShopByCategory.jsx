import Link from "next/link";
import {
  ArrowRight,
  Cable,
  Headphones,
  WashingMachine,
  Flower2,
  Smartphone,
  BatteryCharging,
  Fan,
  Watch,
  Speaker,
  Ear,
  PlugZap,
  AudioLines,
  ChevronRight,
  Sparkles,
  Laptop,
  ScanFace,
} from "lucide-react";

const categories = [
  {
    name: "Adapters & Cables",
    slug: "adapters-cables",
    icon: Cable,
    color: "from-blue-500/10 to-cyan-500/5",
  },
  {
    name: "Headsets",
    slug: "headsets",
    icon: Headphones,
    color: "from-violet-500/10 to-purple-500/5",
  },
  {
    name: "Neckbands",
    slug: "neckbands",
    icon: AudioLines,
    color: "from-indigo-500/10 to-blue-500/5",
  },
  {
    name: "Phone Accessories",
    slug: "phone-accessories",
    icon: Smartphone,
    color: "from-sky-500/10 to-cyan-500/5",
  },
  {
    name: "Laptop Accessories",
    slug: "laptop-accessories",
    icon: Laptop,
    color: "from-indigo-500/10 to-blue-500/5",
  },
  {
    name: "Personal Care Gadgets",
    slug: "personal-care-gadgets",
    icon: ScanFace,
    color: "from-rose-500/10 to-pink-500/5",
  },
  {
    name: "Powerbanks",
    slug: "powerbanks",
    icon: BatteryCharging,
    color: "from-amber-500/10 to-orange-500/5",
  },
  {
    name: "Rechargeable Fans",
    slug: "rechargeable-fans",
    icon: Fan,
    color: "from-teal-500/10 to-emerald-500/5",
  },
  {
    name: "Smart Watches",
    slug: "smart-watches",
    icon: Watch,
    color: "from-purple-500/10 to-fuchsia-500/5",
  },
  {
    name: "Speakers",
    slug: "speakers",
    icon: Speaker,
    color: "from-orange-500/10 to-red-500/5",
  },
  {
    name: "TWS",
    slug: "tws",
    icon: Ear,
    color: "from-blue-500/10 to-indigo-500/5",
  },
  {
    name: "Wired Earphones",
    slug: "wired-earphones",
    icon: PlugZap,
    color: "from-emerald-500/10 to-teal-500/5",
  },
];

export default function ShopByCategory() {
  return (
    <section className="relative overflow-hidden bg-white py-14 text-slate-900 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={15} className="text-blue-600" />

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
                Explore Our Collection
              </p>
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Shop by <span className="text-blue-600">Category</span>
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-500 sm:text-base">
              Find the right tech accessories for your everyday needs. Explore our collection and upgrade your lifestyle.
            </p>
          </div>

          {/* Desktop View All */}
          <Link
            href="/products"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-600 hover:text-white sm:inline-flex"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group relative min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/[0.07] sm:rounded-3xl"
              >
                {/* Background Gradient */}
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${category.color} opacity-30 transition-opacity duration-300 group-hover:opacity-100`}
                />

                <div className="relative">
                  {/* Icon */}
                  <div className="mb-3 flex aspect-[1.5/1] items-center justify-center">
                    <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-blue-600 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-200 group-hover:bg-blue-50 sm:h-[88px] sm:w-[88px] sm:rounded-3xl">
                      <Icon
                        size={39}
                        strokeWidth={1.6}
                        className="transition-all duration-300 group-hover:text-blue-700 sm:h-11 sm:w-11"
                      />

                      {/* Icon Glow */}
                      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>

                  {/* Category Details */}
                      <h3 className="text-sm text-center font-semibold leading-5 text-slate-800 transition-colors group-hover:text-blue-600 sm:text-[15px]">
                        {category.name}
                      </h3>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-6 py-3 text-sm font-semibold text-blue-600 transition-all hover:bg-blue-600 hover:text-white"
          >
            Explore All Products
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
