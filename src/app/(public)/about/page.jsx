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
  Zap,
  Eye,
  Headphones,
  Cable,
  BatteryCharging,
  Users,
  Mail,
  BriefcaseBusiness,
} from "lucide-react";
import Image from "next/image";

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

const highlights = [
  "A convenient place to explore mobile accessories",
  "A shopping experience designed for students",
  "Clear product and pricing information",
  "A simple ordering experience",
];

const founders = [
  {
    name: "Atik Hasan Sarker",
    image: "/images/founder/Atik.jpeg",
    department: "ISLM / NSTU",
    responsibility: "Product, Operations & Technology",
    description:
      "Responsible for product planning, operations, technology, and overall business development.",
    avatarColor: "from-blue-100 to-indigo-100",
    textColor: "text-blue-700",
  },
  {
    name: "Fardin Rahman",
    image: "/images/founder/Fardin.png",
    department: "ISLM / NSTU",
    responsibility: "Business, Marketing & Partnerships",
    description:
      "Responsible for business strategy, marketing, customer relationships, and partnership development.",
    avatarColor: "from-indigo-100 to-blue-100",
    textColor: "text-indigo-700",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      {/* 5. Meet the Founders */}
      <section className="border-t border-slate-100 bg-slate-50/70 py-16">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Users size={17} />
              The People Behind UniTech
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Meet Our Founders
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-500 sm:text-base">
              UniTech is built through the shared vision, dedication, and
              collaboration of two co-founders.
            </p>
          </div>

          {/* Founder Cards */}
          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {founders.map((founder) => (
              <article
                key={founder.name}
                className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-7"
              >
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  {/* Profile Image Placeholder */}
                  <div
                    className={`flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-linear-to-br ${founder.avatarColor} text-4xl font-bold ${founder.textColor}`}
                  >
                    <Image
                      width={144}
                      height={144}
                      src={founder.image}
                      alt="Founder-Image"
                    />
                  </div>

                  {/* Founder Information */}
                  <div className="min-w-0 flex-1 text-center sm:text-left">
                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                      Co-Founder
                    </span>

                    <h3 className="mt-3 text-xl font-bold text-slate-900">
                      {founder.name}
                    </h3>

                    <div className="mt-4 space-y-3 text-sm text-slate-500">
                      <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <GraduationCap
                          size={17}
                          className="shrink-0 text-blue-600"
                        />
                        <span>{founder.department}</span>
                      </div>

                      <div className="flex items-start justify-center gap-2 sm:justify-start">
                        <BriefcaseBusiness
                          size={17}
                          className="mt-0.5 shrink-0 text-blue-600"
                        />
                        <span>{founder.responsibility}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 pt-5">
                  <p className="text-sm leading-7 text-slate-500">
                    {founder.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* Shared Mission */}
          <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-6 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
              <Users size={27} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Our Shared Mission
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-600">
                To build a trusted, student-friendly tech store that makes
                quality mobile accessories more accessible, affordable, and
                convenient for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-blue-50 via-white to-indigo-50">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mx-auto grid container items-center gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:px-8">
          {/* Hero Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <GraduationCap size={17} />
              Made with students in mind
            </div>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
              Technology for Your
              <span className="mt-2 block text-blue-600">Everyday Life.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-slate-600 sm:text-base">
              UniTech is a mobile accessories shopping platform designed with
              the needs of NSTU students in mind. Our goal is to make finding
              and ordering everyday tech essentials simpler and more convenient.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Explore Products
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Product-focused Hero Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative rounded-[2rem] border border-white bg-white/80 p-5 shadow-xl shadow-blue-900/5 backdrop-blur-sm sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                    Welcome to
                  </p>

                  <h2 className="mt-2 text-3xl font-bold text-slate-900">
                    Uni<span className="text-blue-600">Tech</span>
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your Campus Tech Store
                  </p>
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                  <ShoppingBag size={27} />
                </div>
              </div>

              {/* Product Category Cards */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  {
                    icon: Smartphone,
                    title: "Mobile Accessories",
                  },
                  {
                    icon: Headphones,
                    title: "Audio Gadgets",
                  },
                  {
                    icon: BatteryCharging,
                    title: "Power Solutions",
                  },
                  {
                    icon: Cable,
                    title: "Tech Essentials",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        <Icon size={20} />
                      </div>

                      <h3 className="mt-3 text-sm font-bold text-slate-800">
                        {item.title}
                      </h3>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Highlight */}
              <div className="mt-3 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600">
                  <Zap size={23} />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800">
                    Technology Made Convenient
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Discover, choose, and order with ease.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Labels */}
            <div className="absolute -right-0 -top-6 hidden items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-lg sm:flex">
              <CheckCircle2 size={19} className="text-emerald-500" />
              <span className="text-xs font-semibold text-slate-700">
                Student Focused
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="mx-auto container px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Story Content */}
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
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
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:gap-3 hover:text-blue-700"
            >
              Discover Our Collection
              <ArrowRight size={17} />
            </Link>
          </div>

          {/* Story Highlight Card */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-[2rem] bg-linear-to-br from-blue-100 to-indigo-50" />

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

              <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-sm font-bold text-blue-900">
                  Our Philosophy
                </p>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Useful technology, a convenient experience, and a focus on the
                  people who use it every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="border-y border-slate-100 bg-slate-50/70 py-16">
        <div className="mx-auto container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
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
            {/* Mission */}
            <article className="group rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
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

              <div className="mt-6 h-1 w-12 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-20" />
            </article>

            {/* Vision */}
            <article className="group rounded-3xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 sm:p-9">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
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

              <div className="mt-6 h-1 w-12 rounded-full bg-indigo-600 transition-all duration-300 group-hover:w-20" />
            </article>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="mx-auto container px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
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
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${value.color} transition-transform duration-300 group-hover:scale-110`}
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
    </main>
  );
}
