"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  LoaderCircle,
  Smartphone,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { signIn, useSession } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, isPending: sessionPending } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setIsSubmitting(true);

    const form = new FormData(e.currentTarget);
    const user = Object.fromEntries(form.entries());

    const { data, error } = await signIn.email({
      email: user.email,
      password: user.password,
    });
    if (data) {
      toast.success("Sign In Successful! Redirecting...");
        router.replace("/dashboard/admin");
    }else{
      toast.warning("Email and password is incorrect!")
    }  
   
  }

  if (session?.user) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-center text-white">
        <div className="max-w-sm">
          <ShieldCheck className="mx-auto mb-4 h-12 w-12 text-blue-400" />
          <h1 className="text-xl font-semibold">You are already signed in</h1>
          <p className="mt-2 text-sm text-slate-400">
            Your account access will be checked before the admin panel opens.
          </p>
          <button
            type="button"
            onClick={() => {
              router.replace("/dashboard/admin");
              router.refresh();
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            Continue <ArrowRight size={17} />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="grid lg:grid-cols-2 mx-auto min-h-[calc(100vh-5rem)] w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-slate-900 p-10 lg:flex xl:p-14">
          <div
            aria-hidden="true"
            className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl"
          />

          <Link
            href="/"
            aria-label="UniTech Home"
            className="flex shrink-0 items-center"
          >
            <Image
              src="/logo.png"
              alt="UniTech"
              width={160}
              height={60}
              priority
              className="h-auto w-45 object-contain"
            />
          </Link>

          <div className="relative z-10 max-w-xl py-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-300">
              <ShieldCheck size={15} /> Secure administration
            </div>
            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
              Everything your store needs,
              <span className="mt-2 block text-blue-400">in one place.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-400">
              Sign in to manage products, monitor orders, review customers, and
              keep your UniTech store running smoothly.
            </p>
            <div className="mt-10 space-y-4 text-sm text-slate-300">
              {[
                "Manage products and inventory",
                "Track orders and customer activity",
                "Review store performance and analytics",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <p className="relative z-10 text-xs text-slate-500">
            © 2026 UniTech. Authorized access only.
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <div className="flex gap-5 items-center mb-8">
              <Link
                href="/"
                aria-label="UniTech Home"
                className="flex shrink-0 items-center w-fit lg:hidden"
              >
                <Image
                  src="/logo.png"
                  alt="UniTech"
                  width={160}
                  height={60}
                  priority
                  className="h-auto w-40 object-contain"
                />
              </Link>

              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/5 text-blue-300">
                <LockKeyhole size={23} />
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-blue-400">
                ADMINISTRATOR PORTAL
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Welcome back
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your administrator credentials to access the dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="admin@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Password
                </label>
                <div className="relative">
                  <LockKeyhole
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="password"
                    name="password"
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" /> Signing
                    in...
                  </>
                ) : (
                  <>
                    Sign in to dashboard <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
              <p className="text-xs leading-5 text-slate-400">
                Restricted area. Only accounts with the administrator role can
                access the dashboard.
              </p>
            </div>
            <p className="mt-8 text-center text-xs text-slate-600">
              UniTech Admin Portal · Secure sign-in
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
