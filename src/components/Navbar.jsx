"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  UserRound,
  Heart,
  ShoppingCart,
  Menu,
  MapPin,
  CircleHelp,
  ChevronDown,
  House,
  Cable,
  Headphones,
  BatteryCharging,
  Smartphone,
  ShieldCheck,
  CarFront,
  Package,
  SearchX,
  X,
} from "lucide-react";

import { Button, Input } from "@heroui/react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";

const categories = [
  { name: "Home", href: "/", icon: House },
  { name: "All Products", href: "/products" },
  {
    name: "Chargers",
    href: "/products?category=chargers",
    icon: BatteryCharging,
  },
  { name: "Cables", href: "/products?category=cables", icon: Cable },
  { name: "Earphones", href: "/products?category=earphones", icon: Headphones },
  {
    name: "Power Bank",
    href: "/products?category=power-bank",
    icon: BatteryCharging,
  },
  {
    name: "Mobile Cases",
    href: "/products?category=mobile-cases",
    icon: Smartphone,
  },
  {
    name: "Screen Protector",
    href: "/products?category=screen-protector",
    icon: ShieldCheck,
  },
  {
    name: "Mobile Holder",
    href: "/products?category=mobile-holder",
    icon: Smartphone,
  },
  {
    name: "Car Accessories",
    href: "/products?category=car-accessories",
    icon: CarFront,
  },
];

const moreCategories = [
  { name: "Gaming Accessories", href: "/products?category=gaming-accessories" },
  { name: "Adapters", href: "/products?category=adapters" },
  { name: "Other Accessories", href: "/products?category=others" },
];

const utilityLinks = [
  { name: "Track Order", href: "/track-order", icon: Package },
  { name: "Help", href: "/help", icon: CircleHelp },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = 3; // Connect with your cart state later.

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    window.location.href = `/products?search=${encodeURIComponent(query)}`;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07111e]/95 text-white shadow-xl shadow-black/10 backdrop-blur-xl">
        {/* Top Information Bar */}
        <div className="hidden border-b border-white/[0.06] bg-[#0a1523] lg:block">
          <div className="mx-auto flex h-10 max-w-[1440px] items-center justify-between px-6 xl:px-10">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <MapPin size={14} className="text-blue-500" />

              <span>
                Noakhali Science and Technology University (NSTU) Campus
              </span>
            </div>

            <div className="flex items-center gap-6">
              {utilityLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className="flex items-center gap-2 text-xs text-slate-300 transition-colors hover:text-blue-400"
                >
                  <Icon size={14} className="text-blue-500" />
                  {name}
                </Link>
              ))}

              <div className="flex items-center gap-3 border-l border-white/10 pl-5">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-slate-400 transition-colors hover:text-blue-400"
                >
                  <FaFacebook size={16} />
                </a>

                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-slate-400 transition-colors hover:text-pink-400"
                >
                  <BsInstagram size={16} />
                </a>

                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-slate-400 transition-colors hover:text-red-400"
                >
                  <FaYoutube size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 xl:px-10">
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
                width={190}
                height={60}
                priority
                className="h-auto w-[130px] object-contain sm:w-[155px] lg:w-[175px]"
              />
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="hidden min-w-0 flex-1 lg:block lg:max-w-[650px]"
            >
              <div className="flex h-12 overflow-hidden rounded-full border border-white/10 bg-[#101f32] transition-all focus-within:border-blue-500/60 focus-within:ring-2 focus-within:ring-blue-500/10">
                <div className="flex items-center pl-5 text-slate-400">
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
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
              >
                <Menu size={23} />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
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

          {/* Desktop Category Navigation */}
          <nav
            aria-label="Product categories"
            className="hidden h-[54px] items-center justify-between gap-2 overflow-visible lg:flex"
          >
            {categories.slice(0, 8).map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-3 text-[13px] font-medium transition-all xl:px-4 xl:text-sm ${
                  index === 0
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:bg-white/5 hover:text-blue-400"
                }`}
              >
                {category.name === "Home" ? "Home" : category.name}
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                aria-expanded={moreOpen}
                className="flex items-center gap-2 whitespace-nowrap rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-blue-400"
              >
                More
                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close categories menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setMoreOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1929] p-2 shadow-2xl shadow-black/40">
                    {moreCategories.map((category) => (
                      <Link
                        key={category.name}
                        href={category.href}
                        onClick={() => setMoreOpen(false)}
                        className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition-colors hover:bg-blue-600/10 hover:text-blue-400"
                      >
                        {category.name}
                      </Link>
                    ))}

                    <div className="my-2 border-t border-white/10" />

                    <Link
                      href="/deals"
                      onClick={() => setMoreOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-600/10"
                    >
                      Special Deals
                    </Link>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
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

            {/* Drawer Links */}
            <nav
              aria-label="Mobile navigation"
              className="flex-1 overflow-y-auto px-3 pb-5"
            >
              {categories.map(({ name, href, icon: Icon }, index) => (
                <Link
                  key={name}
                  href={href}
                  onClick={closeMobileMenu}
                  className={`flex min-h-12 items-center gap-4 rounded-xl px-4 py-3 text-sm transition-colors ${
                    index === 0
                      ? "bg-blue-600/20 font-medium text-blue-400"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {Icon ? (
                    <Icon size={19} strokeWidth={1.7} />
                  ) : (
                    <Package size={19} strokeWidth={1.7} />
                  )}

                  <span>{name}</span>
                </Link>
              ))}

              {/* More Categories */}
              <div className="my-3 border-t border-white/10" />

              <button
                type="button"
                onClick={() => setMoreOpen((prev) => !prev)}
                aria-expanded={moreOpen}
                className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span className="flex items-center gap-4">
                  <Package size={19} />
                  More Categories
                </span>

                <ChevronDown
                  size={17}
                  className={`transition-transform ${
                    moreOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {moreOpen && (
                <div className="ml-5 border-l border-white/10 pl-4">
                  {moreCategories.map((category) => (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-4 py-3 text-sm text-slate-400 transition-colors hover:text-blue-400"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/deals"
                onClick={closeMobileMenu}
                className="flex min-h-12 items-center gap-4 rounded-xl px-4 py-3 text-sm text-blue-400 transition-colors hover:bg-blue-600/10"
              >
                <ShieldCheck size={19} />
                Special Deals
              </Link>

              {/* Support Links */}
              <div className="my-3 border-t border-white/10" />

              {[
                { name: "Track Order", href: "/track-order", icon: Package },
                { name: "Help & Support", href: "/help", icon: CircleHelp },
                { name: "My Account", href: "/account", icon: UserRound },
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
            </nav>

            {/* Drawer Footer */}
            <div className="shrink-0 border-t border-white/10 bg-[#0a1523] p-5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <MapPin size={15} className="shrink-0 text-blue-500" />

                <span>NSTU Campus, Noakhali</span>
              </div>

              <p className="mt-3 text-xs text-slate-500">
                Your trusted mobile accessories store.
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
