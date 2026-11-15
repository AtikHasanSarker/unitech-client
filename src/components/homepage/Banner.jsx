"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const banners = [
  {
    src: "/images/banner1.png",
    alt: "Apple AirPods Pro 2nd Generation Dubai Version",
  },
  {
    src: "/images/banner2.png",
    alt: "Ven-Dens 20000mAh power bank with built-in charging cable",
  },
  {
    src: "/images/banner3.png",
    alt: "HTC rechargeable hair trimmer AT-1210",
  },
];

export default function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (
      isPaused ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const intervalId = setInterval(() => {
      setActiveIndex((index) => (index + 1) % banners.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isPaused]);

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setActiveIndex((index) => (index - 1 + banners.length) % banners.length);
    }
    if (event.key === "ArrowRight") {
      setActiveIndex((index) => (index + 1) % banners.length);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white my-8">
      <div className="mx-auto container px-4 sm:px-8 lg:px-10">
        <div
          aria-label="Featured product banners"
          aria-roledescription="carousel"
          className="group relative aspect-[2/1] overflow-hidden rounded-2xl border border-white bg-white shadow-[0_24px_70px_-30px_rgba(15,23,42,0.42)] ring-1 ring-slate-900/5 sm:rounded-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
          onKeyDown={handleKeyDown}
        >
          <Link
            href="/products"
            aria-label={`Browse products: ${banners[activeIndex].alt}`}
            className="absolute inset-0 z-0 block focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-[-4px] focus-visible:outline-blue-600"
          >
            <Image
              key={banners[activeIndex].src}
              src={banners[activeIndex].src}
              alt={banners[activeIndex].alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 92vw, 1280px"
              loading={activeIndex === 0 ? "eager" : "lazy"}
              fetchPriority={activeIndex === 0 ? "high" : "auto"}
              className="object-contain transition-transform duration-700 group-hover:scale-[1.01]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-white/5" />
          </Link>

          <div
            aria-label="Choose a banner"
            className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/85 px-2.5 py-2 shadow-lg backdrop-blur-md sm:bottom-4"
          >
            {banners.map((banner, index) => (
              <button
                key={banner.src}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show banner ${index + 1}`}
                aria-current={activeIndex === index ? "true" : undefined}
                className={`h-2 w-2 rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                  activeIndex === index
                    ? "bg-black"
                    : "bg-slate-400 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
