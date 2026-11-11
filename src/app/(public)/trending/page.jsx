import Link from "next/link";
import { ArrowRight, Flame, PackageSearch } from "lucide-react";
import { getProducts } from "@/lib/api/product";
import ProductCard from "@/components/ui/ProductCard";

const MAX_PRODUCTS = 10;

export default function TopTrendingPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto container pb-16 pt-8 px-5 sm:px-8 lg:px-10">
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
            <div className="flex min-w-57 items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-white bg-blue-600 px-6 py-3 text-white shadow-md sm:min-w-[300px] sm:px-10 sm:py-3.5">
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
          <TrendingProducts />
        </section>
      </div>
    </main>
  );
}

async function TrendingProducts() {
  let response;

  try {
    response = await getProducts(
      {
        page: 1,
        limit: MAX_PRODUCTS,
      },
      { next: { revalidate: 60 } },
    );
  } catch (error) {
    console.error("Top trending products error:", error);
    return <ProductsError />;
  }

  if (!response?.success || !Array.isArray(response.data)) {
    return <ProductsError />;
  }

  const products = response.data.filter(
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
        return (
          <ProductCard
            key={product._id}
            product={product}
            isWishListed={false}
            onWishlist={[]}
          />
        );
      })}
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
