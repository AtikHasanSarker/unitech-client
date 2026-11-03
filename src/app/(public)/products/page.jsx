"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  Star,
  X,
  Check,
  Package,
  RotateCcw,
  Truck,
  GraduationCapIcon,
} from "lucide-react";
import { getCategories } from "@/lib/api/category";
import { getProducts } from "@/lib/api/product";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/api/wishlist";

import Image from "next/image";
import ActionButton from "@/components/ui/ActionButton";
const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

function SectionTitle({ children }) {
  return <h3 className="mb-4 text-sm font-bold text-slate-800">{children}</h3>;
}

function FilterSidebar({
  categoryOptions,
  category,
  setCategory,
  maxPrice,
  setMaxPrice,
  inStockOnly,
  setInStockOnly,
  minRating,
  setMinRating,
  resetFilters,
}) {
  return (
    <div className="space-y-7">
      <div>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Filters</h2>

          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Clear all
          </button>
        </div>

        <SectionTitle>Categories</SectionTitle>

        <div className="space-y-1">
          {categoryOptions.map((item) => {
            const value = item.slug === "all" ? "All" : item._id;

            return (
              <button
                key={item.slug || item._id || item.name}
                onClick={() => setCategory(value)}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                  category === value
                    ? "bg-blue-50 font-semibold text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <SectionTitle>Maximum Price</SectionTitle>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">Price range</span>

          <span className="text-sm font-bold text-slate-800">
            ৳{maxPrice.toLocaleString("en-BD")}
          </span>
        </div>

        <input
          type="range"
          min="100"
          max="5000"
          step="50"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full cursor-pointer accent-blue-600"
          aria-label="Maximum price"
        />

        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>৳100</span>

          <span>৳5,000</span>
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <SectionTitle>Customer Rating</SectionTitle>

        <div className="space-y-3">
          {[4, 3, 2, 0].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
            >
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
                className="accent-blue-600"
              />

              {rating === 0 ? (
                <span>All ratings</span>
              ) : (
                <span className="flex items-center gap-1">
                  {rating}+ <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
                </span>
              )}
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-100 pt-6">
        <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded accent-blue-600"
          />
          In-stock products only
        </label>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <GraduationCapIcon />
          Student-friendly shopping
        </div>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Explore accessories for everyday campus life.
        </p>

        <Link
          href="/deals?audience=nstu-students"
          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800"
        >
          Student deals <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}


function ProductCard({ product, isWishlisted, onWishlist, onAddToCart }) {
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]">
      <div
        className={`relative aspect-square overflow-hidden ${product.color}`}
      >
        <Link
          href={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 bg-white"
        >
          <Image
            width={100}
            height={200}
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full mx-auto w-auto p-2 transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </Link>

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-md bg-slate-900 px-2 py-1 text-[9px] font-bold tracking-wider text-white sm:text-[10px]">
            {product.badge}
          </span>
        )}

        {discount > 0 && (
          <span className="absolute bottom-3 left-3 rounded-md bg-red-50 px-2 py-1 text-[10px] font-bold text-red-600">
            -{discount}%
          </span>
        )}

        <button
          onClick={() => onWishlist(product.id)}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute cursor-pointer right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition ${
            isWishlisted
              ? "border-red-100 bg-red-50 text-red-500"
              : "border-white/80 bg-white/90 text-slate-500 hover:text-red-500"
          }`}
        >
          <Heart size={17} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/65">
            <span className="rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="p-3.5 sm:p-4">
        <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400 sm:text-[11px]">
          {product.brand}
        </p>

        <Link href={`/products/${product.id}`}>
          <h3 className="min-h-[40px] text-[13px] font-semibold leading-5 text-slate-800 transition-colors hover:text-blue-600 sm:min-h-[44px] sm:text-sm">
            {product.name}
          </h3>
        </Link>

        {Number.isFinite(product.rating) && (
          <div className="mt-2.5 flex items-center gap-1.5">
            <Star size={13} fill="#F59E0B" stroke="#F59E0B" />

            <span className="text-xs font-semibold text-slate-700">
              {product.rating}
            </span>

            <span className="text-[10px] text-slate-400 sm:text-xs">
              ({product.reviews})
            </span>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-base font-extrabold tracking-tight text-slate-900 sm:text-lg">
            {formatPrice(product.price)}
          </span>

          {product.oldPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        <ActionButton product={product}/>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const router = useRouter();
  const productListingRef = useRef(null);
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.trim() || "";
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 0 });
  const [categoryOptions, setCategoryOptions] = useState([
    { name: "All Products", slug: "all" },
  ]);
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState([]);

  const scrollToProductListing = () => {
    requestAnimationFrame(() => {
      productListingRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const selectedCategoryName =
    categoryOptions.find((item) => item._id === category)?.name || "";

  useEffect(() => {
    let active = true;

    getProducts({
      search: search.trim(),
      category: category === "All" ? undefined : category,
      maxPrice,
      sort:
        sort === "price-low"
          ? "price_asc"
          : sort === "price-high"
            ? "price_desc"
            : "newest",

      page: currentPage,
      limit: 8,
    })
      .then((result) => {
        if (!active) return;

        if (!result?.success) {
          setProducts([]);
          toast.error(result?.message || "Could not load products.");
          return;
        }

        setProducts(
          result.data.map((product) => ({
            ...product,
            id: product._id,
            image: product.images?.[0] || "/images/product-placeholder.png",
            color: "bg-slate-50",
            inStock: Number(product.stock) > 0,
          })),
        );

        setPagination(result.pagination);
      })
      .catch((error) => {
        if (active) {
          toast.error(error?.message || "Could not load products.");
        }
      });

    return () => {
      active = false;
    };
  }, [search, category, maxPrice, sort, currentPage]);

  useEffect(() => {
    let active = true;

    const fetchInitialData = async () => {
      try {
        const [categoryResult, wishlistResult] = await Promise.all([
          getCategories(),
          getWishlist(),
        ]);

        if (!active) return;

        if (categoryResult?.success && Array.isArray(categoryResult.data)) {
          setCategoryOptions([
            { name: "All Products", slug: "all" },
            ...categoryResult.data.map((item) => ({
              _id: item._id,
              name: item.name,
              slug: item.slug,
            })),
          ]);
        }

        if (
          wishlistResult?.success &&
          Array.isArray(wishlistResult.data?.items)
        ) {
          setWishlisted(
            wishlistResult.data.items.map((item) => item.productId),
          );
        }
      } catch (error) {
        console.error("Failed to load categories or wishlist:", error);
      }
    };

    fetchInitialData();

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesPrice = product.price <= maxPrice;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesRating = minRating === 0 || product.rating >= minRating;
      return matchesPrice && matchesStock && matchesRating;
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === "newest") {
      result.sort((a, b) => {
        const aNew = a.badge === "NEW" ? 1 : 0;
        const bNew = b.badge === "NEW" ? 1 : 0;
        return bNew - aNew;
      });
    }

    return result;
  }, [products, sort, maxPrice, inStockOnly, minRating]);
  const totalPages = Math.max(1, pagination.totalPages || 0);
  const safePage = Math.min(currentPage, totalPages);
  const visibleProducts = filteredProducts;

  const resetFilters = () => {
    updateSearch("");
    setCategory("All");
    setSort("featured");
    setMaxPrice(5000);
    setInStockOnly(false);
    setMinRating(0);
    setCurrentPage(1);
  };

  const updateSearch = (value) => {
    setCurrentPage(1);

    const nextSearchParams = new URLSearchParams(searchParams.toString());
    const normalizedSearch = value.trim();

    if (normalizedSearch) {
      nextSearchParams.set("search", normalizedSearch);
    } else {
      nextSearchParams.delete("search");
    }

    const query = nextSearchParams.toString();

    router.replace(query ? `/products?${query}` : "/products", {
      scroll: false,
    });
  };

  const updateCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
    setMobileFiltersOpen(false);
  };

  const toggleWishlist = async (id) => {
    try {
      const result = wishlisted.includes(id)
        ? await removeFromWishlist(id)
        : await addToWishlist(id);

      if (!result?.success) {
        toast.error(result?.message || "Sign in to update your wishlist.");
        return;
      }

      setWishlisted((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id],
      );
    } catch {
      toast.error("Could not update your wishlist.");
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#f8fafc] text-slate-900">
        {/* Page heading */}

        <section className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <nav className="mb-5 flex items-center gap-2 text-xs text-slate-400">
              <Link href="/" className="transition hover:text-blue-600">
                Home
              </Link>

              <ChevronRight size={13} />

              <span className="font-medium text-slate-700">All Products</span>
            </nav>

            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  The UniTech Collection
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px]">
                  All Products
                </h1>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
                  Discover quality mobile accessories for your everyday campus
                  life.
                </p>
              </div>

              <div className="hidden lg:flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Package size={17} className="text-blue-600" />

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Quality Picks
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Everyday essentials
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <Truck size={18} className="text-blue-600" />

                  <div>
                    <p className="text-xs font-bold text-slate-800">
                      Campus Ready
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Made for students
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={productListingRef}
          className="mx-auto max-w-[1440px] scroll-mt-36 px-5 py-8 sm:px-8 lg:px-10 lg:py-10"
        >
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8">
            {/* Desktop sidebar */}

            <aside className="hidden lg:block">
              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5">
                <FilterSidebar
                  categoryOptions={categoryOptions}
                  category={category}
                  setCategory={updateCategory}
                  maxPrice={maxPrice}
                  setMaxPrice={(value) => {
                    setMaxPrice(value);

                    setCurrentPage(1);
                  }}
                  inStockOnly={inStockOnly}
                  setInStockOnly={(value) => {
                    setInStockOnly(value);
                    setCurrentPage(1);
                  }}
                  minRating={minRating}
                  setMinRating={(value) => {
                    setMinRating(value);

                    setCurrentPage(1);
                  }}
                  resetFilters={resetFilters}
                />
              </div>
            </aside>

            {/* Product area */}

            <div className="min-w-0">
              {/* Category chips */}

              <div className="flex justify-between gap-3 items-center pb-2">
                <div className="flex-wrap items-center gap-3 flex">
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="flex cursor-pointer h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 lg:hidden"
                  >
                    <SlidersHorizontal size={16} />
                    Filters
                  </button>

                  <div className="flex flex-end h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 sm:flex-none">
                    <span className="whitespace-nowrap text-xs text-slate-400">
                      Sort by
                    </span>

                    <div className="relative flex-1 sm:flex-none">
                      <select
                        value={sort}
                        onChange={(e) => {
                          setSort(e.target.value);

                          setCurrentPage(1);
                        }}
                        className="h-10 w-full  cursor-pointer appearance-none bg-transparent pr-5 text-xs font-semibold text-slate-700 outline-none sm:w-40"
                        aria-label="Sort products"
                      >
                        <option value="featured">Featured</option>

                        <option value="newest">Newest arrivals</option>

                        <option value="price-low">Price: Low to High</option>

                        <option value="price-high">Price: High to Low</option>

                        <option value="rating">Top Rated</option>
                      </select>

                      <ChevronDown
                        size={14}
                        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {category === "All"
                      ? "Explore Products"
                      : selectedCategoryName}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Showing {visibleProducts.length} of{" "}
                    {filteredProducts.length} products
                  </p>
                </div>

                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 transition hover:text-blue-600"
                >
                  <RotateCcw size={13} />
                  Reset filters
                </button>
              </div>

              {visibleProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlisted.includes(product.id)}
                      onWishlist={toggleWishlist}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                    <Search size={28} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    No products found
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Try a different search term or clear your filters to see
                    more products.
                  </p>

                  <button
                    onClick={resetFilters}
                    className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Pagination */}

              {filteredProducts.length > 0 && (
                <div className="mt-9 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row">
                  <p className="text-xs text-slate-500">
                    Page {safePage} of {totalPages}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentPage((page) => Math.max(1, page - 1));
                        scrollToProductListing();
                      }}
                      disabled={safePage === 1}
                      aria-label="Previous page"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => {
                            setCurrentPage(page);
                            scrollToProductListing();
                          }}
                          aria-current={safePage === page ? "page" : undefined}
                          className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
                            safePage === page
                              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                              : "border border-slate-200 bg-white text-slate-600 hover:border-blue-300 hover:text-blue-600"
                          }`}
                        >
                          {page}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() => {
                        setCurrentPage((page) =>
                          Math.min(totalPages, page + 1),
                        );
                        scrollToProductListing();
                      }}
                      disabled={safePage === totalPages}
                      aria-label="Next page"
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-blue-300 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Mobile filter drawer */}

        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <button
              aria-label="Close filters"
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
            />

            <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                <h2 className="text-lg font-bold text-slate-900">
                  Filter Products
                </h2>

                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  aria-label="Close filter panel"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                <FilterSidebar
                  categoryOptions={categoryOptions}
                  category={category}
                  setCategory={updateCategory}
                  maxPrice={maxPrice}
                  setMaxPrice={(value) => {
                    setMaxPrice(value);
                    setCurrentPage(1);
                  }}
                  inStockOnly={inStockOnly}
                  setInStockOnly={(value) => {
                    setInStockOnly(value);
                    setCurrentPage(1);
                  }}
                  minRating={minRating}
                  setMinRating={(value) => {
                    setMinRating(value);
                    setCurrentPage(1);
                  }}
                  resetFilters={resetFilters}
                />
              </div>

              <div className="border-t border-slate-200 p-4">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Show {filteredProducts.length} products
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
