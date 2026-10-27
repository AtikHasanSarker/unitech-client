"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  UserRound,
  LoaderCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { signUp, useSession } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";

export default function RegisterPage() {
  const router = useRouter();
    const { data: session, isPending: sessionPending } = useSession();
   const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async(e)=> {
    e.preventDefault();
     const form = new FormData(e.currentTarget);
     const user = Object.fromEntries(form.entries());

    setIsSubmitting(true);

    try {
       const { data, error } = await signUp.email({
         name: user.name,
         email: user.email,
         password: user.password,
       });

       console.log("userData:", data)

       if (data) {
         toast.success("You have Registered Successfully!");
         router.push("/");
       } else {
         toast.error("Registration Failed!");
       }

    } finally {
      setIsSubmitting(false);
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
          <Button
            type="button"
            onClick={() => {
              router.replace("/dashboard/admin");
              router.refresh();
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold hover:bg-blue-500"
          >
            Continue <ArrowRight size={17} />
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30 lg:grid-cols-2">
          <section className="hidden flex-col justify-between bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 p-10 lg:flex">
            <Link href="/" className="flex w-fit items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-600">
                <Smartphone size={23} />
              </span>
              <span className="text-2xl font-bold">
                Uni<span className="text-blue-400">Tech</span>
              </span>
            </Link>

            <div className="py-12">
              <div className="mb-6 grid h-14 w-14 place-items-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
                <ShieldCheck size={28} />
              </div>
              <h1 className="text-4xl font-bold leading-tight">
                Create your administrator account.
              </h1>
              <p className="mt-5 max-w-sm leading-7 text-slate-400">
                Set up your account to access the UniTech administration portal.
                Admin permissions must be assigned separately.
              </p>
            </div>

            <p className="text-xs text-slate-500">
              © 20206 UniTech. Authorized access only.
            </p>
          </section>

          <section className="p-6 sm:p-10">

            <div className="mb-7">
              <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-blue-400">
                INITIAL ACCOUNT SETUP
              </p>
              <h2 className="text-3xl font-bold">Create account</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Register your account, then assign its administrator role.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Full name
                </label>
                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />
                </div>
              </div>

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
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    minLength={8}
                    required
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-12 text-sm outline-none placeholder:text-slate-600 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" /> Creating
                    account...
                  </>
                ) : (
                  <>
                    Create account <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-400">
              Already registered?{" "}
              <a
                href="/login"
                className="font-semibold text-blue-400 hover:text-blue-300"
              >
                Sign in
              </a>
            </p>

            <p className="mt-5 text-center text-xs leading-5 text-slate-500">
              This form creates a regular account. Administrator access must be
              granted separately by an authorized setup process.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
