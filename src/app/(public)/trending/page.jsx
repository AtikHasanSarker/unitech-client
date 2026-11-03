import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Flame, ImageOff, PackageSearch } from "lucide-react";

import { getProducts } from "@/lib/api/product";
import ActionButton from "@/components/ui/ActionButton";

const MAX_PRODUCTS = 10;

const formatPrice = (value) =>
  `৳${Number(value).toLocaleString("en-BD", {
    maximumFractionDigits: 2,
  })}`;

export default function TopTrendingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-[1500px] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="transition hover:text-blue-600">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-medium text-slate-800" aria-current="page">
              Top Trending
            </li>
          </ol>
        </nav>

        {/* Trending Products Section */}
        <section className="relative mt-14 rounded-2xl border border-blue-200 px-3 pb-6 pt-10 sm:px-5 sm:pb-8 sm:pt-12 lg:px-9">
          {/* Section Title */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
            <div className="flex min-w-[230px] items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white bg-blue-600 px-6 py-3 text-white shadow-md sm:min-w-[300px] sm:px-10 sm:py-3.5">
              <Flame size={21} />
              <h1 className="text-lg font-bold sm:text-2xl">
                Top Trending Gadgets
              </h1>
            </div>
          </div>

          {/* Section Intro */}
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Trending Products
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Explore popular gadgets from the UniTech collection.
              </p>
            </div>

            <Link
              href="/products"
              className="group inline-flex w-fit items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              View All Products
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Products */}
          <Suspense fallback={<ProductsLoading />}>
            <TrendingProducts />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

async function TrendingProducts() {
  let response;

  try {
    response = await getProducts({
      page: 1,
      limit: MAX_PRODUCTS,
    });
  } catch (error) {
    console.error("Top trending products error:", error);
    return <ProductsError />;
  }

  if (!response?.success || !Array.isArray(response.data)) {
    return <ProductsError />;
  }

  const products = response.data
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
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center">
        <PackageSearch size={34} className="mx-auto text-slate-400" />
        <h3 className="mt-4 font-semibold text-slate-800">
          No products available
        </h3>
        <p className="mt-2 text-sm text-slate-500">
          Check back later for trending products.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => {
        const imageUrl = Array.isArray(product.images)
          ? product.images[0]
          : null;

        return (
          <article
            key={product._id}
            className="group relative min-w-0 overflow-hidden rounded-2xl border border-blue-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-900/5"
          >
            {/* Product Image */}
            <Link
              href={`/products/${product._id}`}
              aria-label={`View ${product.name}`}
              className="block"
            >
              <div className="relative aspect-square overflow-hidden bg-white p-3 sm:p-4">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 20vw"
                    className="object-contain p-3 transition-transform duration-300 group-hover:scale-105 sm:p-5"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-300">
                    <ImageOff size={35} />
                  </div>
                )}

                {/* Trending Badge */}
                <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold text-white sm:text-xs">
                  <Flame size={12} />
                  TRENDING
                </span>
              </div>

              {/* Product Information */}
              <div className="px-3 pt-1 sm:px-4">
                {product.brand && (
                  <p className="mb-1 truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs">
                    {product.brand}
                  </p>
                )}

                <h3 className="line-clamp-2 min-h-10 text-xs font-medium leading-5 text-slate-800 transition-colors group-hover:text-blue-600 sm:text-sm">
                  {product.name}
                </h3>

                <p className="mt-2 text-base font-bold text-blue-600 sm:text-lg">
                  {formatPrice(product.price)}
                </p>
              </div>
            </Link>

            {/* Product Action */}
            <div className="p-3 pt-3 sm:px-4 sm:pb-4">
              <ActionButton product={product} />
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ProductsLoading() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-slate-200"
        >
          <div className="aspect-square animate-pulse bg-slate-100" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-1/3 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-slate-100" />
            <div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" />
            <div className="h-10 animate-pulse rounded-full bg-slate-100" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductsError() {
  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 px-5 py-10 text-center">
      <h3 className="font-semibold text-rose-900">
        Products could not be loaded
      </h3>
      <p className="mt-2 text-sm text-rose-700">Please try again later.</p>
    </div>
  );
}
