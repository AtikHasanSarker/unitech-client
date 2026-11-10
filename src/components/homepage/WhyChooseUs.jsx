import {
  BadgeCheck,
  Wallet,
  Truck,
  Headphones,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Quality Products",
    description:
      "Find reliable mobile accessories selected for everyday performance and convenience.",
    number: "01",
    theme: {
      card: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      icon: "bg-blue-600 text-white shadow-lg shadow-blue-600/25",
      accent: "bg-blue-600",
      number: "text-blue-200",
      glow: "bg-blue-400/15",
      shadow: "hover:shadow-blue-500/15",
    },
  },
  {
    icon: Wallet,
    title: "Student-Friendly Prices",
    description:
      "Get useful tech accessories at prices that fit a student's budget.",
    number: "02",
    theme: {
      card: "bg-violet-50 border-violet-200 hover:bg-violet-100",
      icon: "bg-violet-600 text-white shadow-lg shadow-violet-600/25",
      accent: "bg-violet-600",
      number: "text-violet-200",
      glow: "bg-violet-400/15",
      shadow: "hover:shadow-violet-500/15",
    },
  },
  {
    icon: Truck,
    title: "Campus Convenience",
    description:
      "Shop online and arrange convenient delivery or collection around campus.",
    number: "03",
    theme: {
      card: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      icon: "bg-emerald-600 text-white shadow-lg shadow-emerald-600/25",
      accent: "bg-emerald-600",
      number: "text-emerald-200",
      glow: "bg-emerald-400/15",
      shadow: "hover:shadow-emerald-500/15",
    },
  },
  {
    icon: Headphones,
    title: "Friendly Support",
    description:
      "Get help choosing products and answers to your questions before purchasing.",
    number: "04",
    theme: {
      card: "bg-amber-50 border-amber-200 hover:bg-amber-100",
      icon: "bg-amber-500 text-white shadow-lg shadow-amber-500/25",
      accent: "bg-amber-500",
      number: "text-amber-200",
      glow: "bg-amber-400/15",
      shadow: "hover:shadow-amber-500/15",
    },
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="mx-auto container px-5 sm:px-8 lg:px-10">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-14">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-bold tracking-wide text-blue-700">
            <ShieldCheck size={15} />
            THE UNITECH DIFFERENCE
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why Choose <span className="text-blue-600">UniTech?</span>
          </h2>

          <p className="mx-auto mt-4 max-w-5xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
            Better accessories, thoughtful service, and a shopping experience
            designed around your everyday tech needs.
          </p>
        </div>

        {/* Benefit Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {benefits.map(({ icon: Icon, title, description, number, theme }) => (
            <article
              key={title}
              className={`group relative isolate min-h-[310px] overflow-hidden rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${theme.card} ${theme.shadow} sm:p-7`}
            >
              {/* Decorative Glow */}
              <div
                className={`pointer-events-none absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full blur-3xl transition-transform duration-500 group-hover:scale-150 ${theme.glow}`}
              />

              {/* Decorative Number */}
              <span
                className={`absolute right-6 top-5 text-5xl font-black tracking-tighter opacity-70 transition-all duration-300 group-hover:scale-110 ${theme.number}`}
              >
                {number}
              </span>

              {/* Icon */}
              <div
                className={`relative flex h-[62px] w-[62px] items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${theme.icon}`}
              >
                <Icon size={29} strokeWidth={1.9} />
              </div>

              {/* Accent Line */}
              <div
                className={`mt-7 h-1.5 w-12 rounded-full transition-all duration-300 group-hover:w-20 ${theme.accent}`}
              />

              {/* Content */}
              <h3 className="mt-5 text-lg font-bold leading-7 text-slate-900 sm:text-xl">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {description}
              </p>

              {/* Bottom Decorative Circle */}
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full border-2 border-white/70 transition-transform duration-500 group-hover:scale-125" />
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:mt-12 sm:p-8">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -right-12 -top-20 h-48 w-48 rounded-full bg-blue-200/50 blur-3xl" />

          <div className="relative flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="text-center sm:text-left">
              <div className="mb-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700 sm:justify-start">
                <Sparkles size={15} />
                Upgrade Your Everyday Tech
              </div>

              <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Ready to upgrade your everyday tech?
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore mobile accessories for your daily needs.
              </p>
            </div>

            <Link href="/products">
              <Button className="group h-12 shrink-0 rounded-full bg-blue-600 px-7 font-semibold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30">
                Explore Products
                <ArrowRight
                  size={17}
                  className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
