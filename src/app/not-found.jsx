import Link from "next/link";
import { ArrowLeft, ArrowRight, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-lg text-center">

        {/* Error Code */}
        <h1 className="mt-7 text-7xl font-extrabold tracking-tight text-blue-600 sm:text-8xl">
          404
        </h1>

        {/* Message */}
        <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
          Sorry, the page you are looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>

        {/* Navigation Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-600"
          >
            Explore Products
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Footer Text */}
        <p className="mt-12 text-xs text-slate-400">
          Error Code: 404
          <span className="mx-2">•</span>
          UniTech — Your Campus Tech Store
        </p>
      </div>
    </main>
  );
}
