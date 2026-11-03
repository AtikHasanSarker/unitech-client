"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Target,
  Truck,
  Users,
  Zap,
  Eye,
  Headphones,
} from "lucide-react";

const values = [
  {
    icon: ShieldCheck,
    title: "Quality You Can Trust",
    description:
      "We aim to make it easier to find reliable mobile accessories that meet your everyday needs.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "A straightforward shopping experience, clear product information, and helpful customer support are our priorities.",
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: GraduationCap,
    title: "Student Friendly",
    description:
      "UniTech is designed with the needs and budgets of NSTU students in mind.",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: ShieldCheck,
    title: "Simple & Secure Shopping",
    description:
      "We aim to make product discovery and ordering simple, convenient, and transparent.",
    color: "bg-emerald-50 text-emerald-600",
  },
];

const features = [
  {
    icon: Smartphone,
    title: "Essential Accessories",
    description:
      "Explore mobile accessories for charging, connectivity, audio, and everyday use.",
  },
  {
    icon: GraduationCap,
    title: "NSTU-Focused Experience",
    description:
      "A shopping experience designed around the needs of the university community.",
  },
  {
    icon: Truck,
    title: "Convenient Delivery",
    description:
      "Find delivery information and choose an available delivery option when placing an order.",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description:
      "Get in touch with us if you have questions about products or your order.",
  },
];

const highlights = [
  "A convenient place to explore mobile accessories",
  "A shopping experience designed for students",
  "Clear product and pricing information",
  "A simple ordering experience",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0B1739]">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-blue-200">
              <GraduationCap size={17} />
              Made with students in mind
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Technology for Your
              <span className="mt-2 block text-blue-400">Everyday Life.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-slate-300 sm:text-base">
              UniTech is a mobile accessories shopping platform designed with
              the needs of NSTU students in mind. Our goal is to make finding
              and ordering everyday tech essentials simpler and more convenient.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Explore Products
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="rounded-3xl border border-white/10 bg-[#111F46] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-300">
                      Welcome to
                    </p>
                    <h2 className="mt-2 text-3xl font-bold text-white">
                      Uni<span className="text-blue-400">Tech</span>
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-300">
                    <Smartphone size={30} />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                      <Zap size={23} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-white">
                      Everyday Tech
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Essentials for daily use
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                      <GraduationCap size={23} />
                    </div>
                    <p className="mt-4 text-sm font-semibold text-white">
                      Student Focus
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Designed for campus life
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                    <ShoppingBag size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      A Simpler Shopping Experience
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      Discover, choose, and order with ease.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 top-12 hidden items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-3 shadow-xl sm:flex">
                <CheckCircle2 size={19} className="text-emerald-500" />
                <span className="text-xs font-semibold text-slate-800">
                  Student Focused
                </span>
              </div>

              <div className="absolute -bottom-4 -left-3 hidden items-center gap-2 rounded-xl border border-white/10 bg-white px-4 py-3 shadow-xl sm:flex">
                <Heart size={19} className="text-rose-500" />
                <span className="text-xs font-semibold text-slate-800">
                  Built Around Your Needs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Who We Are
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
              Making Everyday Tech Shopping Easier
            </h2>

            <p className="mt-6 text-sm leading-8 text-slate-500 sm:text-base">
              Technology has become an essential part of student life. From
              charging cables and adapters to earphones and power banks, the
              right accessories help students stay connected, productive, and
              prepared throughout the day.
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-500 sm:text-base">
              UniTech is being developed to bring these everyday essentials
              together in one convenient online shopping experience, with a
              particular focus on the NSTU community.
            </p>

            <p className="mt-4 text-sm leading-8 text-slate-500 sm:text-base">
              We aim to make product discovery straightforward, provide clear
              information, and help customers make informed purchasing
              decisions.
            </p>

            <Link
              href="/products"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
            >
              Discover Our Collection
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-blue-50" />

            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Target size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                What We Want to Achieve
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                Our focus is on creating a convenient, accessible, and
                student-oriented way to shop for mobile accessories.
              </p>

              <div className="mt-7 space-y-4">
                {highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-blue-600"
                    />
                    <p className="text-sm leading-6 text-slate-600">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-[#0B1739] p-5">
                <p className="text-sm font-semibold text-white">
                  Our Philosophy
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Useful technology, a convenient experience, and a focus on the
                  people who use it every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-slate-50 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Our Direction
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Mission & Vision
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              The principles that guide our approach to online shopping.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:border-blue-200 hover:shadow-lg sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Target size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Our Mission
              </h3>

              <p className="mt-4 text-sm leading-8 text-slate-500 sm:text-base">
                To make mobile accessories easier to discover and order by
                offering a convenient shopping platform that considers the
                everyday needs of NSTU students and other customers.
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 transition hover:border-violet-200 hover:shadow-lg sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                <Eye size={28} />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                Our Vision
              </h3>

              <p className="mt-4 text-sm leading-8 text-slate-500 sm:text-base">
                To develop UniTech into a trusted and convenient destination for
                mobile accessories, building a better online shopping experience
                around accessibility, useful products, and customer needs.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            What Matters to Us
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Our Core Values
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
            The principles we want to bring to every part of the UniTech
            shopping experience.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/40"
              >
                <div
                  className={`flex h-13 w-13 items-center justify-center rounded-2xl p-3 ${value.color}`}
                >
                  <Icon size={25} />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Why Choose UniTech */}
      <section className="bg-[#0B1739] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                The UniTech Difference
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                Designed Around Your Everyday Needs
              </h2>

              <p className="mt-5 text-sm leading-8 text-slate-300 sm:text-base">
                We want to remove unnecessary complexity from buying mobile
                accessories. Our goal is to help you find relevant products,
                understand your options, and place orders with confidence.
              </p>

              <Link
                href="/products"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500"
              >
                Start Shopping
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:bg-white/[0.08] sm:p-6"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                      <Icon size={24} />
                    </div>

                    <h3 className="mt-5 text-base font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* NSTU Community */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-blue-50 p-7 sm:p-10 lg:p-14">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700">
                <GraduationCap size={17} />
                For the NSTU Community
              </div>

              <h2 className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                A Shopping Experience with Students in Mind
              </h2>

              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
                University life comes with different needs and budgets. UniTech
                aims to make everyday mobile accessories more convenient to
                explore and order for NSTU students. Any student discounts or
                special offers will depend on the promotions available at the
                time.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/deals?audience=nstu-students"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Explore Student Deals
                  <ArrowRight size={17} />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-blue-200 bg-white shadow-sm sm:h-40 sm:w-40">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-blue-600 sm:h-32 sm:w-32">
                <Users size={52} strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mx-auto max-w-7xl rounded-3xl bg-slate-50 px-6 py-12 text-center sm:px-10 sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
            <ShoppingBag size={27} />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your Next Essential Accessory Awaits
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Explore the collection and find the accessories you need for your
            everyday life.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Products
              <ArrowRight size={17} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-600"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
