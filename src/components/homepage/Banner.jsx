"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  Truck,
  Wallet,
  Sparkles,
} from "lucide-react";
import { Button } from "@heroui/react";

const features = [
  {
    icon: BadgeCheck,
    title: "100% Original",
    description: "Trusted Products",
  },
  {
    icon: Wallet,
    title: "Affordable",
    description: "Student Pricing",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Within Campus",
  },
  {
    icon: ShieldCheck,
    title: "Secure",
    description: "Shopping Experience",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-[#060d18] text-white">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-32 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />

        <div className="absolute -left-32 bottom-0 h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_45%,rgba(37,99,235,0.13),transparent_50%)]" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      </div>

      {/* Hero Content */}
      <div className="mx-auto grid min-h-[490px] max-w-[1440px] items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[510px] lg:grid-cols-2 lg:gap-4 lg:px-10 lg:py-14">
        {/* Left Content */}
        <div className="relative z-10 max-w-2xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2 text-xs font-medium tracking-wide text-blue-300 sm:text-sm">
            <Sparkles size={15} className="text-cyan-400" />

            <span>PREMIUM MOBILE ACCESSORIES</span>
          </div>

          {/* Heading */}
          <h1 className="text-[38px] font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[58px] xl:text-[64px]">
            Better Accessories
            <span className="mt-2 block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              For A Smarter You
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
            Discover premium mobile accessories at affordable prices.
            Upgrade your everyday tech with trusted products, student-friendly
            deals, and convenient campus delivery.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            <Button
              as={Link}
              href="/products"
              className="group h-12 rounded-full bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500 sm:px-7"
            >
              Shop Now

              <ArrowRight
                size={18}
                className="ml-2 transition-transform group-hover:translate-x-1"
              />
            </Button>

            <Button
              as={Link}
              href="/categories"
              variant="outline"
              className="h-12 rounded-full border border-white/20 bg-white/[0.03] px-6 font-medium text-white transition-all hover:border-blue-400/50 hover:bg-blue-500/10 sm:px-7"
            >
              Explore Categories
            </Button>
          </div>

          {/* Small Trust Message */}
          <div className="mt-7 flex items-center gap-2 text-xs text-slate-500 sm:text-sm">
            <ShieldCheck size={16} className="text-blue-400" />

            <span>Quality products. Better prices. Campus convenience.</span>
          </div>
        </div>

        {/* Right Product Image */}
        <div className="relative mx-auto flex w-full max-w-[580px] items-center justify-center lg:h-full lg:max-w-none">
          {/* Image Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[90px] sm:h-80 sm:w-80" />

          {/* Product Showcase */}
          <div className="relative aspect-[5/4] w-full">
            <Image
              src="/images/hero-accessories.png"
              alt="Premium mobile accessories including charger, smartphone, cables and wireless earbuds"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain object-center"
            />

            {/* Floating Product Label */}
            <div className="absolute bottom-4 left-2 rounded-2xl border border-white/10 bg-[#0b1726]/85 px-4 py-3 shadow-xl backdrop-blur-xl sm:bottom-8 sm:left-4 sm:px-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-blue-400">
                Everyday Essentials
              </p>

              <p className="mt-1 text-sm font-semibold text-white sm:text-base">
                Your Tech, Upgraded.
              </p>
            </div>

            {/* Floating Quality Badge */}
            <div className="absolute right-1 top-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0b1726]/85 px-3 py-2.5 shadow-xl backdrop-blur-xl sm:right-4 sm:top-8 sm:px-4 sm:py-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                <ShieldCheck size={20} />
              </div>

              <div>
                <p className="text-xs font-semibold text-white sm:text-sm">
                  Premium Quality
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400 sm:text-xs">
                  Made for everyday use
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Bar */}
      <div className="border-t border-white/[0.07] bg-white/[0.02]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 px-5 sm:px-8 md:grid-cols-4 lg:px-10">
          {features.map(({ icon: Icon, title, description }, index) => (
            <div
              key={title}
              className={`flex items-center gap-3 py-5 sm:gap-4 sm:py-6 ${
                index % 2 === 0 ? "pr-3" : "pl-3"
              } ${
                index < 2 ? "border-b border-white/[0.07] md:border-b-0" : ""
              } ${
                index === 0 || index === 2
                  ? "md:border-r md:border-white/[0.07] md:pr-5"
                  : ""
              } ${
                index === 1 || index === 3
                  ? "md:pl-5 lg:pl-8"
                  : ""
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-400 sm:h-12 sm:w-12">
                <Icon size={21} strokeWidth={1.8} />
              </div>

              <div className="min-w-0">
                <h3 className="text-xs font-semibold text-white sm:text-sm">
                  {title}
                </h3>

                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
