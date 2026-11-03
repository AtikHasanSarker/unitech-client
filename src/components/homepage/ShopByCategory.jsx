import Link from "next/link";
import {
  ArrowRight,
  Cable,
  Headphones,
  Smartphone,
  BatteryCharging,
  Fan,
  Watch,
  Speaker,
  Ear,
  PlugZap,
  AudioLines,
  Sparkles,
  Laptop,
  ScanFace,
} from "lucide-react";

const categories = [
  {
    name: "Adapters & Cables",
    slug: "adapters-cables",
    icon: Cable,
  },
  {
    name: "Headsets",
    slug: "headsets",
    icon: Headphones,
  },
  {
    name: "Neckbands",
    slug: "neckbands",
    icon: AudioLines,
  },
  {
    name: "Phone Accessories",
    slug: "phone-accessories",
    icon: Smartphone,
  },
  {
    name: "Laptop Accessories",
    slug: "laptop-accessories",
    icon: Laptop,
  },
  {
    name: "Personal Care Gadgets",
    slug: "personal-care-gadgets",
    icon: ScanFace,
  },
  {
    name: "Powerbanks",
    slug: "powerbanks",
    icon: BatteryCharging,
  },
  {
    name: "Rechargeable Fans",
    slug: "rechargeable-fans",
    icon: Fan,
  },
  {
    name: "Smart Watches",
    slug: "smart-watches",
    icon: Watch,
  },
  {
    name: "Speakers",
    slug: "speakers",
    icon: Speaker,
  },
  {
    name: "TWS",
    slug: "tws",
    icon: Ear,
  },
  {
    name: "Wired Earphones",
    slug: "wired-earphones",
    icon: PlugZap,
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-white py-14 text-slate-900 sm:py-16">
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
              Find the right tech accessories for your everyday needs. Explore
              our collection and upgrade your lifestyle.
            </p>
          </div>

          {/* Desktop View All */}
          <Link
            href="/products"
            className="group hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-blue-600 hover:bg-blue-600 hover:text-white sm:inline-flex"
          >
            View All
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-8">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group flex min-w-0 flex-col items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white p-3 transition-colors duration-200 hover:border-blue-400"
              >
                {/* Category Icon */}
                <div className="flex h-15 w-full items-center justify-center">
                  <Icon
                    size={60}
                    strokeWidth={1.35}
                    className="text-neutral-500 transition-colors duration-200 group-hover:text-blue-600 sm:h-15 sm:w-15"
                  />
                </div>

                {/* Category Name */}
                <h3 className="text-center text-sm font-medium text-slate-900 transition-colors duration-200 group-hover:text-blue-600 sm:text-base">
                  {category.name}
                </h3>
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
