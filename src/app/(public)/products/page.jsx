import { Suspense } from "react";
import ProductsClient from "./ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div
          role="status"
          className="min-h-[50vh] bg-white px-5 py-16 text-center text-sm text-slate-500"
        >
          Loading products...
        </div>
      }
    >
      <ProductsClient />
    </Suspense>
  );
}
