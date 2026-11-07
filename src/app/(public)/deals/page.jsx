import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  GraduationCap,
  ImageOff,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";
import { getProducts } from "@/lib/api/product";
import ActionButton from "@/components/ui/ActionButton";

const MAX_PRODUCTS = 20;
const formatPrice = (value) =>
  `৳${Number(value).toLocaleString("en-BD", { maximumFractionDigits: 2 })}`;

export default function DealsPage() {
  return (
    <div className="bg-white text-[#0F172A]">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-blue-600">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-slate-800">
              Budget Deals
            </li>
          </ol>
        </nav>

        <section className="mt-6 grid overflow-hidden rounded-2xl border border-slate-200 bg-white lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col items-start justify-center px-6 py-9 sm:px-9 sm:py-12 lg:px-12">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-sm font-semibold text-blue-700">
              <GraduationCap size={17} aria-hidden="true" />
              NSTU student collection
            </div>

            <h1 className="max-w-2xl text-3xl font-bold leading-tight text-[#0F172A] sm:text-4xl lg:text-[42px]">
              Exclusive Deals for NSTU Students
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              Enjoy an exclusive 10% discount on every product. Upgrade your
              everyday tech for less!
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-xl bg-blue-600 px-4 py-3 text-white shadow-sm shadow-blue-600/20">
              <BadgePercent size={27} strokeWidth={1.8} aria-hidden="true" />
              <div>
                <p className="text-xl font-extrabold leading-none">10% OFF</p>
                <p className="mt-1 text-xs font-medium text-blue-100">
                  On every product
                </p>
              </div>
            </div>
          </div>

          <div className="relative min-h-64 border-t border-slate-200 bg-slate-100 sm:min-h-80 lg:min-h-95 lg:border-l lg:border-t-0">
            <Image
              src="/images/nstu.png"
              alt="Students at Noakhali Science and Technology University"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-white/80 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur-sm sm:bottom-6 sm:right-6 sm:px-4 sm:py-3 sm:text-sm">
              <ShieldCheck size={17} className="text-blue-600" aria-hidden="true" />
              Flat savings across the collection
            </div>
          </div>
        </section>

        <section aria-labelledby="deals-heading" className="pt-12 sm:pt-16">
          <div className="mb-7 border-b border-slate-200 pb-5 sm:mb-8 sm:flex sm:items-end sm:justify-between sm:gap-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase text-blue-700">
                Made for campus life
              </p>
              <h2
                id="deals-heading"
                className="text-2xl font-bold text-[#0F172A] sm:text-3xl"
              >
                NSTU Student Deals
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Explore our exclusive collection and save 10% on every purchase.
              </p>
            </div>
          </div>

            <DealsProducts />
        </section>

        <aside className="mt-12 flex flex-col gap-4 rounded-xl border border-blue-100 bg-blue-50/70 p-5 sm:flex-row sm:items-center sm:gap-5 sm:p-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
            <GraduationCap size={22} aria-hidden="true" />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">
              A little more room in your student budget
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Every product in this collection is shown with a flat 10% discount
              from its current listed price. The discount is calculated for display;
              the original product price remains unchanged.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

async function DealsProducts() {
  const fetchProducts = await getProducts(
    { page: 1, limit: MAX_PRODUCTS },
    { next: { revalidate: 60 } },
  );

  const products = fetchProducts?.data
    .filter(
      (product) =>
        product?._id &&
        product.name &&
        Number.isFinite(Number(product.price)) &&
        Number(product.price) >= 0,
    )
    .slice(0, MAX_PRODUCTS);

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
          <PackageSearch size={25} aria-hidden="true" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          No products available right now
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          Check back soon for products from the UniTech collection.
        </p>
        <Link
          href="/products"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          Browse all products <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        const originalPrice = Number(product.price);
        const discountedPrice = Math.round(originalPrice * 0.9);
        const imageUrl = Array.isArray(product.images)
          ? product.images[0]
          : null;

        return (
          <article
            key={product._id}
            className="group min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5"
          >
            <Link
              href={`/products/${product._id}`}
              aria-label={`View ${product.name}`}
              className="block"
            >
              <div className="relative aspect-square overflow-hidden bg-white">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 23vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-[1.03] sm:p-5"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <ImageOff size={32} aria-hidden="true" />
                  </div>
                )}
                <span className="absolute left-2 top-2 rounded-md bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white shadow-sm sm:left-3 sm:top-3 sm:text-xs">
                  10% OFF
                </span>
              </div>

              <div className="p-3 sm:p-4">
                {product.brand && (
                  <p className="mb-1.5 truncate text-[10px] font-semibold uppercase text-slate-400 sm:text-xs">
                    {product.brand}
                  </p>
                )}
                <h3 className="line-clamp-2 min-h-10 text-xs font-semibold leading-5 text-slate-800 transition-colors group-hover:text-blue-700 sm:text-sm">
                  {product.name}
                </h3>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-base font-bold text-blue-700 sm:text-lg">
                    {formatPrice(discountedPrice)}
                  </span>
                  <span className="text-xs text-slate-400 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                </div>
              <ActionButton product={product} />
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
