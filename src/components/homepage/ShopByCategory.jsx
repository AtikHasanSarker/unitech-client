import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@heroui/react";

const categories = [
  {
    name: "Chargers",
    slug: "chargers",
    image: "/images/categories/chargers.png",
  },
  {
    name: "Cables",
    slug: "cables",
    image: "/images/categories/cables.png",
  },
  {
    name: "Earphones",
    slug: "earphones",
    image: "/images/categories/earphones.png",
  },
  {
    name: "Power Bank",
    slug: "power-bank",
    image: "/images/categories/power-bank.png",
  },
  {
    name: "Mobile Cases",
    slug: "mobile-cases",
    image: "/images/categories/mobile-cases.png",
  },
  {
    name: "Screen Protector",
    slug: "screen-protector",
    image: "/images/categories/screen-protector.png",
  },
  {
    name: "Mobile Holder",
    slug: "mobile-holder",
    image: "/images/categories/mobile-holder.png",
  },
  {
    name: "More Accessories",
    slug: "others",
    image: "/images/categories/others.png",
  },
];

export default function ShopByCategory() {
  return (
    <section className="bg-[#f8fafc] py-14 text-slate-900 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 sm:text-sm">
              Find Your Essentials
            </p>

            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Shop by Category
            </h2>

            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-500">
              Explore quality accessories designed for your everyday tech.
            </p>
          </div>

          <Button
            as={Link}
            href="/categories"
            variant="outline"
            className="hidden shrink-0 rounded-full border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-blue-300 hover:text-blue-600 sm:inline-flex"
          >
            View All
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products?category=${category.slug}`}
              className="group min-w-0"
            >
              {/* Image Card */}
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-200 group-hover:shadow-lg group-hover:shadow-blue-900/[0.06] sm:rounded-3xl sm:p-4">
                {/* Background Glow */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-50/80 via-transparent to-slate-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative h-full w-full">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 12vw"
                    className="object-contain p-1 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-2 right-2 flex h-7 w-7 translate-y-2 items-center justify-center rounded-full bg-blue-600 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Category Name */}
              <h3 className="mt-3 text-center text-xs font-semibold text-slate-700 transition-colors group-hover:text-blue-600 sm:mt-4 sm:text-sm">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-7 flex justify-center sm:hidden">
          <Button
            as={Link}
            href="/categories"
            variant="outline"
            className="rounded-full border-slate-200 bg-white px-6 text-sm font-medium text-slate-700"
          >
            View All Categories
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}