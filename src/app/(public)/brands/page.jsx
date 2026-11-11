import Image from "next/image";
import Link from "next/link";

const brands = [
  {
    name: "Apple",
    slug: "apple",
    logo: "/images/brand/apple.png",
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    logo: "/images/brand/xiaomi.jpeg",
  },
  {
    name: "Hoco",
    slug: "hoco",
    logo: "/images/brand/hoco.jpg",
  },
  {
    name: "HTC",
    slug: "htc",
    logo: "/images/brand/htc.webp",
  },
  {
    name: "Oraimo",
    slug: "oraimo",
    logo: "/images/brand/oraimo.png",
  },

  {
    name: "Baseus",
    slug: "baseus",
    logo: "/images/brand/baseus.png",
  },
  {
    name: "OnePlus",
    slug: "oneplus",
    logo: "/images/brand/oneplus.jpg",
  },
  {
    name: "Ven-Dens",
    slug: "ven-dens",
    logo: "/images/brand/ven-dens.webp",
  },
];

export default function BrandsPage() {
  return (
    <section className="mx-auto min-h-full w-full container py-8 px-5 sm:px-8 lg:px-10">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-10 flex items-center gap-3 text-base sm:text-lg"
      >
        <Link
          href="/"
          className="text-foreground/60 transition-colors hover:text-primary"
        >
          Home
        </Link>

        <span className="text-foreground/40">/</span>

        <span aria-current="page" className="font-semibold text-foreground">
          Brands
        </span>
      </nav>

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          ALL BRANDS
        </h1>

        <div className="mt-3 h-1 w-14 rounded-full bg-primary" />
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {brands.map((brand) => (
          <Link
            key={brand.slug}
            href={`/products?brand=${brand.slug}`}
            className="group flex h-20 flex-col items-center justify-center gap-4 rounded-xl border border-default-200 bg-content1 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-primary hover:shadow-md"
          >
            <Image
              width={100}
              height={80}
              src={brand.logo}
              alt={`${brand.name} logo`}
              unoptimized
              className="object-contain w-full transition-transform duration-200 group-hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
