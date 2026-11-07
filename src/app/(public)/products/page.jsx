import { Suspense } from "react";
import ProductsPageClient from "./ProductsPageClient";

export default function ProductsPage({ searchParams }) {
  return (
    <Suspense fallback={null}>
      <ProductsContent searchParams={searchParams} />
    </Suspense>
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

  return (
    <ProductsPageClient
      initialSearch={search}
      initialCategory={category}
    />
  );
}
