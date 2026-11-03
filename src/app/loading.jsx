import Image from "next/image";

export default function Loading() {
  return (
    <main className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center px-5 text-center">

        {/* Loading Animation */}
        <div className="relative flex h-14 w-14 items-center justify-center">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-blue-100" />

          {/* Spinning Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-blue-600 border-r-blue-400" />

          {/* Inner Circle */}
          <div className="h-3 w-3 rounded-full bg-blue-600" />
        </div>

        {/* Loading Text */}
        <h2 className="mt-6 text-base font-semibold text-slate-800">
          Loading...
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Please wait while we prepare your experience.
        </p>

        {/* Loading Progress Dots */}
        <div className="mt-5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-600" />
        </div>
      </div>
    </main>
  );
}
