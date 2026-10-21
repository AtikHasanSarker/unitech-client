import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, BadgePercent } from "lucide-react";

export default function StudentDiscount() {
  return (
    <section className="bg-[#f8fafc] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="group relative isolate overflow-hidden rounded-2xl bg-[#07111f] shadow-sm">
          {/* Background Image */}
          <div className="absolute inset-0 -z-20">
            <Image
              src="/images/nstu-students.png"
              alt="NSTU students enjoying exclusive UniTech offers"
              fill
              priority={false}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>

          {/* Overlay for text readability */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06101e] via-[#06101e]/90 to-transparent" />

          {/* Additional bottom overlay for mobile */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#06101e]/40 via-transparent to-transparent sm:hidden" />

          {/* Main Content */}
          <div className="relative flex min-h-[300px] items-center px-6 py-10 sm:min-h-[320px] sm:px-10 sm:py-12 lg:min-h-[340px] lg:px-12">
            <div className="max-w-xl">
              {/* Badge */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-2 text-xs font-medium text-blue-300 backdrop-blur-sm sm:text-sm">
                <GraduationCap size={17} />
                Exclusive Campus Offer
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[42px]">
                Special Discounts
                <span className="mt-1 block text-blue-400">
                  For NSTU Students
                </span>
              </h2>

              {/* Description */}
              <p className="mt-4 max-w-md text-sm leading-6 text-slate-300 sm:text-base">
                Quality Accessories. Better Student Life.
                <br className="hidden sm:block" />
                Discover great deals on your everyday tech essentials.
              </p>

              {/* CTA Button */}
              <Link
                href="/deals?audience=nstu-students"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:bg-blue-500 hover:shadow-blue-500/30"
              >
                Shop Now
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

            {/* Decorative Discount Icon */}
            <div className="absolute right-8 top-8 hidden rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 text-blue-300 backdrop-blur-md sm:block lg:right-12 lg:top-10">
              <BadgePercent size={30} strokeWidth={1.5} />
            </div>

            {/* Bottom-right decorative label */}
            <div className="absolute bottom-6 right-8 hidden items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs text-white/80 backdrop-blur-md lg:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Made for the NSTU community
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
