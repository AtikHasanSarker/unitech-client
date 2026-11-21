import { Suspense } from "react";
import { getCachedCategories } from "@/lib/api/category";
import { getCachedProducts } from "@/lib/api/product";
import ProductsPageClient from "./ProductsPageClient";

export default function ProductsPage({ searchParams }) {
  return (
    <Suspense fallback={<ProductsPageClientFallback />}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
  );
}

function ProductsPageClientFallback() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto container px-5 py-8 sm:py-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
            The UniTech Collection
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            All Products
          </h1>
        </div>
      </section>
      <div
        className="mx-auto flex min-h-[380px] container flex-col items-center justify-center px-5 text-center"
        aria-live="polite"
      >
        <div className="relative flex h-12 w-12 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-[3px] border-blue-100" />
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-blue-600 border-r-blue-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
        </div>
        <p className="mt-4 text-sm font-medium text-slate-500">
          Loading products...
        </p>
      </div>
    </main>
  );
}

async function ProductsContent({ searchParams }) {
  const params = await searchParams;

  const search = Array.isArray(params?.search)
    ? params.search[0]
    : params?.search || "";

  const category = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category || "All";

  const [productsResponse, categoriesResponse] = await Promise.allSettled([
    getCachedProducts({
      search,
      category: category === "All" ? undefined : category,
      maxPrice: 5000,
      sort: "newest",
      page: 1,
      limit: 12,
    }),
    getCachedCategories(),
  ]);

  if (productsResponse.status === "rejected") {
    console.error("Failed to load initial products:", productsResponse.reason);
  }
  if (categoriesResponse.status === "rejected") {
    console.error("Failed to load initial categories:", categoriesResponse.reason);
  }

  const initialProducts =
    productsResponse.status === "fulfilled" &&
    productsResponse.value?.success &&
    Array.isArray(productsResponse.value.data)
      ? productsResponse.value.data
      : [];
  const initialCategories =
    categoriesResponse.status === "fulfilled" &&
    categoriesResponse.value?.success &&
    Array.isArray(categoriesResponse.value.data)
      ? categoriesResponse.value.data
      : [];

  return (
    <ProductsPageClient
      key={`${search}:${category}`}
      initialSearch={search}
      initialCategory={category}
      initialProducts={initialProducts}
      initialPagination={
        productsResponse.status === "fulfilled"
          ? productsResponse.value?.pagination
          : undefined
      }
      initialProductsLoaded={
        productsResponse.status === "fulfilled" &&
        productsResponse.value?.success &&
        Array.isArray(productsResponse.value.data)
      }
      initialCategories={initialCategories}
      initialCategoriesLoaded={
        categoriesResponse.status === "fulfilled" &&
        categoriesResponse.value?.success &&
        Array.isArray(categoriesResponse.value.data)
      }
    />
  );
}
