import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, GraduationCap, Truck } from "lucide-react";

export default function CampusDelivery() {
  return (
    <section className="bg-white py-8 sm:py-14">
      <div className="mx-auto container px-5">
        <article className="grid overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-50 via-white to-emerald-50 shadow-sm lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col items-start justify-center p-6 sm:p-10 lg:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-3.5 py-2 text-xs font-semibold text-blue-700 shadow-sm sm:text-sm">
              <GraduationCap size={17} />A benefit for NSTU students
            </span>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Free Delivery
              <span className="mt-1 block text-blue-600">
                Right to NSTU Campus
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
              Shop your favorite tech accessories and get them delivered to NSTU
              campus with no delivery charge.
            </p>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
              >
                Shop Now
                <ArrowRight size={17} />
              </Link>

              <Link
                href="https://www.facebook.com/unitechfa"
                target="_blank"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700"
              >
                Follow Us On Facebook
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[220px] sm:min-h-[300px] lg:min-h-[360px]">
            <Image
              src="/images/nstu.png"
              alt="NSTU Shaheed Minar on campus"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 px-4 py-3 text-slate-800 shadow-lg backdrop-blur-sm sm:bottom-6 sm:left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Truck size={20} />
              </span>
              <span>
                <span className="block text-sm font-bold">৳0 Delivery</span>
                <span className="block text-xs text-slate-500">
                  At NSTU campus
                </span>
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
