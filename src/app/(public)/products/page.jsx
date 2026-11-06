import ProductsPageClient from "./ProductsPageClient";

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;

  const search = Array.isArray(params?.search)
    ? params.search[0]
    : params?.search || "";

  const category = Array.isArray(params?.category)
    ? params.category[0]
    : params?.category || "All";

  return (
    <ProductsPageClient
      key={`${search}-${category}`}
      initialSearch={search}
      initialCategory={category}
    />
  );
}
