import {
  BadgeCheck,
  Wallet,
  Truck,
  Headphones,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

const benefits = [
  {
    icon: BadgeCheck,
    title: "Quality Products",
    description:
      "Find reliable mobile accessories selected for everyday performance and convenience.",
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    icon: Wallet,
    title: "Student-Friendly Prices",
    description:
      "Get useful tech accessories at prices that fit a student's budget.",
    iconStyle: "bg-violet-50 text-violet-600",
  },
  {
    icon: Truck,
    title: "Campus Convenience",
    description:
      "Shop online and arrange convenient delivery or collection around campus.",
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: Headphones,
    title: "Friendly Support",
    description:
      "Get help choosing products and answers to your questions before purchasing.",
    iconStyle: "bg-amber-50 text-amber-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-[#f8fafc] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            <ShieldCheck size={14} />
            THE UNITECH DIFFERENCE
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
            Why Choose <span className="text-blue-600">UniTech?</span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
            Better accessories, thoughtful service, and a shopping experience
            designed around your everyday tech needs.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {benefits.map(({ icon: Icon, title, description, iconStyle }) => (
            <article
              key={title}
              className="group rounded-2xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.04] sm:rounded-3xl sm:p-6"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${iconStyle} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={23} strokeWidth={1.8} />
              </div>

              <h3 className="mt-5 text-base font-bold text-slate-900 sm:text-lg">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-indigo-50 p-5 sm:mt-10 sm:flex-row sm:p-7">
          <div>
            <h3 className="text-lg font-bold text-slate-900 sm:text-xl">
              Ready to upgrade your everyday tech?
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Explore mobile accessories for your daily needs.
            </p>
          </div>

          <Link href="/products">
          <Button
            className="group h-11 shrink-0 rounded-full bg-blue-600 px-6 font-semibold text-white hover:bg-blue-500"
          >
            Explore Products
            <ArrowRight
              size={17}
              className="ml-2 transition-transform group-hover:translate-x-1"
            />
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}