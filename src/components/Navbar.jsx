"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
  Search,
  UserRound,
  Heart,
  ShoppingCart,
  Menu,
  MapPin,
  CircleHelp,
  ChevronDown,
  Cable,
  Headphones,
  BatteryCharging,
  Smartphone,
  Package,
  X,
  Watch,
  Gamepad2,
  Plug,
  House,
  TrendingUp,
  Tag,
  Info,
  Contact,
  Phone,
  Mail,
  Van,
  Laptop,
} from "lucide-react";

import { Button } from "@heroui/react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";


const productCategories = [
  {
    name: "All Products",
    href: "/products",
    icon: Package,
  },
  {
    name: "Power Banks",
    href: "/products?category=power-bank",
    icon: BatteryCharging,
  },
  {
    name: "Earbuds & TWS",
    href: "/products?category=earphones",
    icon: Headphones,
  },
  {
    name: "Neckbands",
    href: "/products?category=neckbands",
    icon: Headphones,
  },
  {
    name: "Chargers",
    href: "/products?category=chargers",
    icon: Plug,
  },
  {
    name: "Cables",
    href: "/products?category=cables",
    icon: Cable,
  },
  {
    name: "Phone Accessories",
    href: "/products?category=phone-accessories",
    icon: Smartphone,
  },
  {
    name: "Laptop Accessories",
    href: "/products?category=laptop-accessories",
    icon: Laptop,
  },
  {
    name: "Other Accessories",
    href: "/products?category=others",
    icon: Package,
  },
];


const navigationLinks = [
  {
    name: "Home",
    href: "/",
    icon: House,
  },
  {
    name: "Shop",
    href: "/products",
    icon: Package,
  },
  {
    name: "Brands",
    href: "/brands",
    icon: Tag,
  },
  {
    name: "Top Trending",
    href: "/products?sort=trending",
    icon: TrendingUp,
  },
  {
    name: "Budget Deals",
    href: "/deals",
    icon: Tag,
  },
  {
    name: "About Us",
    href: "/about",
    icon: Info,
  },
  {
    name: "Contact Us",
    href: "/contact",
    icon: Contact,
  },
  {
    name: "Track Order",
    href: "/track-order",
    icon: Van,
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/unitechfa",
    icon: FaFacebook,
    hoverColor: "hover:text-blue-500",
  },
  {
    name: "Instagram",
    href: "#",
    icon: BsInstagram,
    hoverColor: "hover:text-pink-500",
  },
  {
    name: "YouTube",
    href: "#",
    icon: FaYoutube,
    hoverColor: "hover:text-red-500",
  },
];


export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState("menu");
  const [searchQuery, setSearchQuery] = useState("");

  // Connect with your actual cart state later.
  const cartCount = 3;


  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    router.push(`/products?search=${encodeURIComponent(query)}`);

    setMobileMenuOpen(false);
  };

  // ============================================
  // MOBILE MENU HANDLERS
  // ============================================

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileActiveTab("menu");
  };

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
    setMobileActiveTab("menu");
  };

  // ============================================
  // ACTIVE ROUTE CHECK
  // ============================================

  const isActiveRoute = (href) => {
    const route = href.split("?")[0];

    if (route === "/") {
      return pathname === "/";
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  };

  // ============================================
  // MAIN UI
  // ============================================

  return (
    <>
      {/* TOP INFORMATION BAR */}
      <div className="hidden border-b border bg-white text-black lg:block">
        <div className="mx-auto flex h-7 container items-center justify-between px-5">
          {/* Location */}
          <div className="flex items-center gap-2 text-xs font-bold">
            Welcome to Your Trusted Mobile Accessories Store!
          </div>

          {/* Utility Links + Phone */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 font-semibold text-xs transition-colors hover:text-blue-400 pr-5 border-r">
              <Mail size={14} className="text-blue-500" />
              unitech24@gmail.com
            </div>

            {/* Phone Number */}
            <a
              href="tel:01604498384"
              className="flex items-center gap-2 border-l border-white/10 pl-2 text-xs font-semibold transition-colors hover:text-blue-400"
            >
              <Phone size={14} className="text-blue-500" />
              <span>01604498384</span>
            </a>
          </div>
        </div>
      </div>
      {/* ========================================
          MAIN NAVBAR
      ======================================== */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07111e] text-white shadow-xl shadow-black/10">
        <div className="mx-auto max-w-[1440px] px-4 backdrop-blur-xl sm:px-6 xl:px-10">

          <div className="flex h-[76px] items-center justify-between gap-4 lg:gap-6">
            {/* Logo */}
            <Link
              href="/"
              aria-label="UniTech Home"
              className="flex shrink-0 items-center"
            >
              <Image
                src="/logo.png"
                alt="UniTech"
                width={180}
                height={50}
                priority
                className="h-auto w-[120px] object-contain sm:w-[155px] lg:w-[175px]"
              />
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="hidden min-w-0 flex-1 lg:block lg:max-w-[650px]"
            >
              <div className="flex h-12 overflow-hidden rounded-full border border-white/10 bg-[#101f32] transition-all focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/10">
                <div className="flex items-center pl-5">
                  <Search size={19} />
                </div>

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for accessories (e.g. charger, case, earphone...)"
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent px-4 text-sm text-white outline-none placeholder:text-slate-500"
                />

                <Button
                  type="submit"
                  isIconOnly
                  aria-label="Search"
                  className="h-full w-14 min-w-14 rounded-none rounded-r-full bg-blue-600 text-white transition-colors hover:bg-blue-500"
                >
                  <Search size={22} />
                </Button>
              </div>
            </form>

            {/* Desktop Actions */}
            <div className="hidden shrink-0 items-center gap-5 lg:flex xl:gap-7">
              <Link
                href="/account"
                aria-label="My account"
                className="text-slate-200 transition-colors hover:text-blue-400"
              >
                <UserRound size={23} strokeWidth={1.7} />
              </Link>

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="text-slate-200 transition-colors hover:text-blue-400"
              >
                <Heart size={25} strokeWidth={1.7} />
              </Link>

              <Link
                href="/cart"
                aria-label={`Shopping cart, ${cartCount} items`}
                className="relative text-slate-200 transition-colors hover:text-blue-400"
              >
                <ShoppingCart size={25} strokeWidth={1.7} />

                {cartCount > 0 && (
                  <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white ring-2 ring-[#07111e]">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex shrink-0 items-center gap-4 lg:hidden">
              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="text-slate-200 transition-colors hover:text-blue-400 sm:hidden"
              >
                <Heart size={22} />
              </Link>

              <Link
                href="/cart"
                aria-label="Shopping cart"
                className="relative text-slate-200 transition-colors hover:text-blue-400"
              >
                <ShoppingCart size={23} />

                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={openMobileMenu}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10 cursor-pointer"
              >
                <Menu size={23} />
              </button>
            </div>
          </div>

          {/* ====================================
              MOBILE SEARCH
          ==================================== */}

          <form onSubmit={handleSearch} className="pb-4 lg:hidden">
            <div className="flex h-11 overflow-hidden rounded-full border border-white/10 bg-[#101f32] focus-within:border-blue-500/60">
              <div className="flex items-center pl-4 text-slate-400">
                <Search size={17} />
              </div>

              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mobile accessories..."
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-500"
              />

              <Button
                type="submit"
                isIconOnly
                aria-label="Search"
                className="h-full w-12 min-w-12 rounded-none rounded-r-full bg-blue-600 text-white hover:bg-blue-500"
              >
                <Search size={19} />
              </Button>
            </div>
          </form>

          {/* ====================================
              DESKTOP NAVIGATION
          ==================================== */}

          <nav
            aria-label="Main navigation"
            className="hidden h-10 items-center justify-between gap-3 border-t border-white/10 lg:flex"
          >
            {/* LEFT: Categories + Navigation */}
            <div className="flex h-full min-w-0 items-center gap-3 lg:gap-6">
              {/* Browse Categories */}
              <div className="group relative h-full shrink-0">
                <button
                  type="button"
                  aria-haspopup="true"
                  className="flex h-full min-w-[190px] items-center justify-between gap-2 rounded-t-xl bg-blue-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-blue-500 xl:min-w-[215px] xl:px-4 xl:text-sm"
                >
                  <span className="flex items-center gap-2">
                    <Menu size={19} />
                    Browse Categories
                  </span>

                  <ChevronDown
                    size={15}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>

                {/* Category Dropdown */}
                <div className="invisible absolute left-0 top-full z-[60] w-[260px] translate-y-2 overflow-hidden rounded-b-xl border border-white/10 bg-[#0c1929] py-2 opacity-0 shadow-2xl shadow-black/40 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {productCategories.map(({ name, href, icon: Icon }) => (
                    <Link
                      key={name}
                      href={href}
                      className="flex items-center justify-between gap-3 px-5 py-3 text-sm text-slate-300 transition-colors hover:bg-blue-600/10 hover:text-blue-400"
                    >
                      <span className="flex items-center gap-3">
                        <Icon size={17} className="shrink-0 text-slate-400" />
                        {name}
                      </span>

                      <ChevronDown
                        size={14}
                        className="-rotate-90 text-slate-500"
                      />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Main Navigation Links */}
              <div className="flex h-full min-w-0 items-center gap-3 lg:gap-10">
                {navigationLinks.map((item) => {
                  const isActive = isActiveRoute(item.href);

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`relative whitespace-nowrap py-2 text-xs font-medium transition-colors lg:text-sm ${
                        isActive
                          ? "text-blue-400"
                          : "text-slate-300 hover:text-blue-400"
                      }`}
                    >
                      {item.name}

                      {isActive && (
                        <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: Social Icons */}
            <div className="flex shrink-0 items-center gap-3 border-l border-white/10 pl-3 xl:gap-4 xl:pl-4">
              {socialLinks.map(({ name, href, icon: Icon, hoverColor }) => (
                <a
                  key={name}
                  href={href}
                  target={href === "#" ? undefined : "_blank"}
                  rel={href === "#" ? undefined : "noopener noreferrer"}
                  aria-label={name}
                  className={`text-slate-400 transition-colors ${hoverColor}`}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>
      {/* ========================================
          MOBILE NAVIGATION DRAWER
      ======================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="absolute inset-0 h-full w-full bg-black/70 backdrop-blur-sm"
          />

          {/* Drawer */}
          <aside className="absolute right-0 top-0 flex h-full w-[min(88%,380px)] flex-col border-l border-white/10 bg-[#07111e] shadow-2xl shadow-black/50">
            {/* Drawer Header */}
            <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-white/10 px-5">
              <Link href="/" onClick={closeMobileMenu}>
                <Image
                  src="/images/logo.png"
                  alt="UniTech"
                  width={160}
                  height={50}
                  className="h-auto w-[135px] object-contain"
                />
              </Link>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            {/* Drawer Search */}
            <form onSubmit={handleSearch} className="shrink-0 px-5 py-4">
              <div className="flex h-11 items-center gap-3 rounded-full border border-white/10 bg-[#101f32] px-4 focus-within:border-blue-500/60">
                <Search size={17} className="shrink-0 text-slate-400" />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search accessories..."
                  aria-label="Search products"
                  className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                />

                <button type="submit" aria-label="Search">
                  <Search size={17} className="text-blue-400" />
                </button>
              </div>
            </form>

            {/* Mobile Menu / Categories Tabs */}
            <div className="shrink-0 px-4 pb-3">
              <div
                className="grid grid-cols-2 rounded-xl border border-white/10 bg-[#101f32] p-1"
                role="tablist"
                aria-label="Navigation sections"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileActiveTab === "menu"}
                  onClick={() => setMobileActiveTab("menu")}
                  className={`rounded-lg py-3 text-sm font-semibold transition-all duration-200 ${
                    mobileActiveTab === "menu"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Menu
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={mobileActiveTab === "categories"}
                  onClick={() => setMobileActiveTab("categories")}
                  className={`rounded-lg py-3 text-sm font-semibold transition-all duration-200 ${
                    mobileActiveTab === "categories"
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Categories
                </button>
              </div>
            </div>

            {/* Mobile Drawer Content */}
            <nav
              aria-label={
                mobileActiveTab === "menu"
                  ? "Mobile navigation links"
                  : "Mobile product categories"
              }
              className="flex-1 overflow-y-auto px-4 pb-5"
            >
              {mobileActiveTab === "menu" ? (
                /* MENU TAB */
                <div className="space-y-1">
                  {navigationLinks.map((item) => {
                    const Icon = item.icon;
                    const isActive = isActiveRoute(item.href);

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className={`flex min-h-12 items-center gap-4 rounded-xl px-4 py-3 text-sm transition-colors ${
                          isActive
                            ? "bg-blue-600/15 font-semibold text-blue-400"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon size={19} strokeWidth={1.7} />

                        <span>{item.name}</span>

                        <ChevronDown
                          size={15}
                          className="ml-auto -rotate-90 text-slate-500"
                        />
                      </Link>
                    );
                  })}
                </div>
              ) : (
                /* CATEGORIES TAB */
                <div className="space-y-1">
                  {productCategories.map(({ name, href, icon: Icon }) => (
                    <Link
                      key={name}
                      href={href}
                      onClick={closeMobileMenu}
                      className="flex min-h-12 items-center gap-4 rounded-xl px-4 py-3 text-sm text-slate-300 transition-colors hover:bg-blue-600/10 hover:text-blue-400"
                    >
                      <Icon size={19} strokeWidth={1.7} />

                      <span>{name}</span>

                      <ChevronDown
                        size={15}
                        className="ml-auto -rotate-90 text-slate-500"
                      />
                    </Link>
                  ))}
                </div>
              )}

              {/* Utility Links */}
              <div className="my-4 border-t border-white/10" />

              <div className="space-y-1">
                {[
                  {
                    name: "Track Order",
                    href: "/track-order",
                    icon: Package,
                  },
                  {
                    name: "Help & Support",
                    href: "/help",
                    icon: CircleHelp,
                  },
                  {
                    name: "My Account",
                    href: "/account",
                    icon: UserRound,
                  },
                ].map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    onClick={closeMobileMenu}
                    className="flex min-h-12 items-center gap-4 rounded-xl px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Icon size={19} />
                    {name}
                  </Link>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
