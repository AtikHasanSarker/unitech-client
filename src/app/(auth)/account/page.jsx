"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Checkbox } from "@heroui/react";
import {
  User,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only - no API or database connection
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-[480px]">
        {/* Header */}
        <div className="mb-8 text-center">

          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Create your account
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Join UniTech and explore your everyday tech essentials.
          </p>
        </div>

        {/* Register Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.04)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Full Name
              </label>

              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                />

                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  required
                  fullWidth
                  className="h-12 rounded-xl pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                />

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  autoComplete="email"
                  required
                  fullWidth
                  className="h-12 rounded-xl pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400"
                />

                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  fullWidth
                  className="h-12 rounded-xl px-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 z-10 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="pt-1">
              <Checkbox name="terms" defaultSelected={false}>
                <Checkbox.Content className="items-start gap-2">
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>

                  <span className="text-sm leading-5 text-slate-600">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </Checkbox.Content>
              </Checkbox>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              className="h-12 w-full rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Create Account
              <ArrowRight size={17} />
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Login */}
          <p className="text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Footer Note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck size={15} />
          <span>Your information is kept private.</span>
        </div>
      </div>
    </main>
  );
}
