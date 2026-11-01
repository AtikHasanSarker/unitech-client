import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    name: "Apple",
    slug: "apple",
    logo: "https://cdn.simpleicons.org/apple",
  },
  {
    name: "Samsung",
    slug: "samsung",
    logo: "https://cdn.simpleicons.org/samsung",
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    logo: "https://cdn.simpleicons.org/xiaomi",
  },
  {
    name: "Anker",
    slug: "anker",
    logo: "https://cdn.simpleicons.org/anker",
  },
  {
    name: "JBL",
    slug: "jbl",
    logo: "https://cdn.simpleicons.org/jbl",
  },
  {
    name: "Baseus",
    slug: "baseus",
    logo: "https://cdn.simpleicons.org/baseus",
  },
  {
    name: "Sony",
    slug: "sony",
    logo: "https://cdn.simpleicons.org/sony",
  },
  {
    name: "Logitech",
    slug: "logitech",
    logo: "https://cdn.simpleicons.org/logitech",
  },
  {
    name: "UGREEN",
    slug: "ugreen",
    logo: "https://cdn.simpleicons.org/ugreen",
  },
  {
    name: "OnePlus",
    slug: "oneplus",
    logo: "https://cdn.simpleicons.org/oneplus",
  },
  {
    name: "Google",
    slug: "google",
    logo: "https://cdn.simpleicons.org/google",
  },
  {
    name: "Huawei",
    slug: "huawei",
    logo: "https://cdn.simpleicons.org/huawei",
  },
];

export default function BrandsPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          ALL BRANDS
        </h1>
        <div className="mt-3 h-1 w-14 rounded-full bg-primary" />
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/products?brand=${brand.slug}`}
            className="group flex min-h-36 flex-col items-center justify-center gap-4 rounded-xl border border-default-200 bg-content1 p-5 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
          >
            <div className="flex h-16 w-full items-center justify-center">
              <Image
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-12 max-w-[130px] object-contain transition-transform duration-200 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <h2 className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
              {brand.name}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
