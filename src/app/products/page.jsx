"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  X,
  Check,
  Package,
  RotateCcw,
  Truck,
} from "lucide-react";

// Temporary placeholder data.
// Replace this array with your API data later.
const products = [
  {
    id: "p1",
    name: "Baseus Bowie WM02 Wireless Earbuds",
    brand: "Baseus",
    category: "Earphones",
    price: 1450,
    oldPrice: 1890,
    rating: 4.8,
    reviews: 124,
    badge: "BEST SELLER",
    color: "bg-violet-50",
    image: "https://placehold.co/600x600/f5f3ff/7c3aed?text=Wireless+Earbuds",
    inStock: true,
  },
  {
    id: "p2",
    name: "UGREEN 20W USB-C Fast Charger",
    brand: "UGREEN",
    category: "Chargers",
    price: 890,
    oldPrice: 1090,
    rating: 4.7,
    reviews: 86,
    badge: "POPULAR",
    color: "bg-blue-50",
    image: "https://placehold.co/600x600/eff6ff/2563eb?text=Fast+Charger",
    inStock: true,
  },
  {
    id: "p3",
    name: "Baseus Cafule USB-C Cable",
    brand: "Baseus",
    category: "Cables",
    price: 390,
    oldPrice: 490,
    rating: 4.6,
    reviews: 58,
    badge: "",
    color: "bg-slate-100",
    image: "https://placehold.co/600x600/f1f5f9/475569?text=USB-C+Cable",
    inStock: true,
  },
  {
    id: "p4",
    name: "Remax RPP- to 10000mAh Power Bank",
    brand: "Remax",
    category: "Power Banks",
    price: 1690,
    oldPrice: 1990,
    rating: 4.8,
    reviews: 93,
    badge: "SALE",
    color: "bg-cyan-50",
    image: "https://placehold.co/600x600/ecfeff/0891b2?text=Power+Bank",
    inStock: true,
  },
  {
    id: "p5",
    name: "Premium Shockproof Phone Case",
    brand: "UniTech",
    category: "Mobile Cases",
    price: 350,
    oldPrice: 450,
    rating: 4.5,
    reviews: 41,
    badge: "",
    color: "bg-orange-50",
    image: "https://placehold.co/600x600/fff7ed/c2410c?text=Phone+Case",
    inStock: true,
  },
  {
    id: "p6",
    name: "Tempered Glass Screen Protector",
    brand: "UniTech",
    category: "Screen Protectors",
    price: 150,
    oldPrice: 200,
    rating: 4.4,
    reviews: 67,
    badge: "",
    color: "bg-emerald-50",
    image: "https://placehold.co/600x600/ecfdf5/059669?text=Screen+Guard",
    inStock: true,
  },
  {
    id: "p7",
    name: "UGREEN HiTune Wireless Headphones",
    brand: "UGREEN",
    category: "Earphones",
    price: 2250,
    oldPrice: 2790,
    rating: 4.9,
    reviews: 112,
    badge: "TOP RATED",
    color: "bg-pink-50",
    image: "https://placehold.co/600x600/fdf2f8/be185d?text=Headphones",
    inStock: true,
  },
  {
    id: "p8",
    name: "Adjustable Mobile Phone Stand",
    brand: "Remax",
    category: "Mobile Holders",
    price: 450,
    oldPrice: 550,
    rating: 4.5,
    reviews: 35,
    badge: "NEW",
    color: "bg-amber-50",
    image: "https://placehold.co/600x600/fffbeb/b45309?text=Phone+Stand",
    inStock: false,
  },
  {
    id: "p9",
    name: "Baseus 65W GaN Fast Charger",
    brand: "Baseus",
    category: "Chargers",
    price: 2490,
    oldPrice: 2990,
    rating: 4.9,
    reviews: 74,
    badge: "POPULAR",
    color: "bg-indigo-50",
    image: "https://placehold.co/600x600/eef2ff/4338ca?text=65W+Charger",
    inStock: true,
  },
  {
    id: "p10",
    name: "Braided USB-C Charging Cable",
    brand: "UGREEN",
    category: "Cables",
    price: 290,
    oldPrice: 390,
    rating: 4.4,
    reviews: 28,
    badge: "",
    color: "bg-teal-50",
    image: "https://placehold.co/600x600/f0fdfa/0f766e?text=Braided+Cable",
    inStock: true,
  },
  {
    id: "p11",
    name: "Slim Magnetic Power Bank",
    brand: "Baseus",
    category: "Power Banks",
    price: 2190,
    oldPrice: 2590,
    rating: 4.7,
    reviews: 52,
    badge: "NEW",
    color: "bg-sky-50",
    image:
      "https://placehold.co/600x600/f0f9ff/0369a1?text=Magnetic+Power+Bank",
    inStock: true,
  },
  {
    id: "p12",
    name: "Transparent Anti-Scratch Phone Case",
    brand: "UniTech",
    category: "Mobile Cases",
    price: 290,
    oldPrice: 390,
    rating: 4.3,
    reviews: 19,
    badge: "",
    color: "bg-stone-100",
    image: "https://placehold.co/600x600/f5f5f4/57534e?text=Clear+Phone+Case",
    inStock: true,
  },
];

const categories = [
  { name: "All Products", count: products.length },
  {
    name: "Chargers",
    count: products.filter((p) => p.category === "Chargers").length,
  },
  {
    name: "Cables",
    count: products.filter((p) => p.category === "Cables").length,
  },
  {
    name: "Earphones",
    count: products.filter((p) => p.category === "Earphones").length,
  },
  {
    name: "Power Banks",
    count: products.filter((p) => p.category === "Power Banks").length,
  },
  {
    name: "Mobile Cases",
    count: products.filter((p) => p.category === "Mobile Cases").length,
  },
  {
    name: "Screen Protectors",
    count: products.filter((p) => p.category === "Screen Protectors").length,
  },
  {
    name: "Mobile Holders",
    count: products.filter((p) => p.category === "Mobile Holders").length,
  },
];

const formatPrice = (price) => `৳${price.toLocaleString("en-BD")}`;

function SectionTitle({ children }) {
  return <h3 className="mb-4 text-sm font-bold text-slate-800">{children}</h3>;
}

function FilterSidebar({
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
          {categories.map((item) => (
            <button
              key={item.name}
              onClick={() =>
                setCategory(item.name === "All Products" ? "All" : item.name)
              }
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                (item.name === "All Products" && category === "All") ||
                item.name === category
                  ? "bg-blue-50 font-semibold text-blue-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span>{item.name}</span>
              <span className="text-xs text-slate-400">{item.count}</span>
            </button>
          ))}
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

function GraduationCapIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="m2 10 10-5 10 5-10 5-10-5Z" />
      <path d="M6 12v5c3.5 3 8.5 3 12 0v-5" />
      <path d="M22 10v6" />
    </svg>
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
          className="absolute inset-0"
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
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
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition ${
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

        <div className="mt-2.5 flex items-center gap-1.5">
          <Star size={13} fill="#F59E0B" stroke="#F59E0B" />
          <span className="text-xs font-semibold text-slate-700">
            {product.rating}
          </span>
          <span className="text-[10px] text-slate-400 sm:text-xs">
            ({product.reviews})
          </span>
        </div>

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

        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 sm:text-sm"
        >
          <ShoppingCart size={15} />
          {product.inStock ? "Add to Cart" : "Unavailable"}
        </button>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [wishlisted, setWishlisted] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [notice, setNotice] = useState("");

  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        `${product.name} ${product.brand} ${product.category}`
          .toLowerCase()
          .includes(search.trim().toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice = product.price <= maxPrice;
      const matchesStock = !inStockOnly || product.inStock;
      const matchesRating = product.rating >= minRating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPrice &&
        matchesStock &&
        matchesRating
      );
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sort === "newest") {
      result.sort((a, b) => {
        const aNew = a.badge === "NEW" ? 1 : 0;
        const bNew = b.badge === "NEW" ? 1 : 0;
        return bNew - aNew;
      });
    }

    return result;
  }, [search, category, sort, maxPrice, inStockOnly, minRating]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / itemsPerPage),
  );

  const safePage = Math.min(currentPage, totalPages);

  const visibleProducts = filteredProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("featured");
    setMaxPrice(5000);
    setInStockOnly(false);
    setMinRating(0);
    setCurrentPage(1);
  };

  const updateSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const updateCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
    setMobileFiltersOpen(false);
  };

  const toggleWishlist = (id) => {
    setWishlisted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const addToCart = (product) => {
    setCartCount((count) => count + 1);
    setNotice(`${product.name} added to your demo cart.`);
    window.setTimeout(() => setNotice(""), 2500);
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

              <div className="flex flex-wrap gap-3">
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

        {/* Main listing */}
        <section className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          {/* Search and sorting toolbar */}
          <div className="mb-7 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search accessories, brands..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600 lg:hidden"
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>

              <div className="flex h-11 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 sm:flex-none">
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
                    className="h-10 w-full appearance-none bg-transparent pr-6 text-xs font-semibold text-slate-700 outline-none sm:w-40"
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

          <div className="grid grid-cols-1 gap-7 lg:grid-cols-[245px_minmax(0,1fr)] lg:gap-8">
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-6 rounded-2xl border border-slate-200 bg-white p-5">
                <FilterSidebar
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
              <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                {["All", "Chargers", "Cables", "Earphones", "Power Banks"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => updateCategory(item)}
                      className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
                        category === item
                          ? "border-blue-600 bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                          : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                      }`}
                    >
                      {item === "All" ? "All Products" : item}
                    </button>
                  ),
                )}
              </div>

              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {category === "All" ? "Explore Products" : category}
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
                      onAddToCart={addToCart}
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
                      onClick={() =>
                        setCurrentPage((page) => Math.max(1, page - 1))
                      }
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
                          onClick={() => setCurrentPage(page)}
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
                      onClick={() =>
                        setCurrentPage((page) => Math.min(totalPages, page + 1))
                      }
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

        {/* Demo cart feedback */}
        {notice && (
          <div
            role="status"
            className="fixed bottom-5 right-5 z-[120] flex max-w-[calc(100vw-40px)] items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 shadow-xl"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <Check size={17} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900">
                Added to demo cart
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{notice}</p>
              <p className="mt-2 text-xs font-semibold text-blue-600">
                Items added this session: {cartCount}
              </p>
            </div>
            <button
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
              className="text-slate-400 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </main>
    </>
  );
}
