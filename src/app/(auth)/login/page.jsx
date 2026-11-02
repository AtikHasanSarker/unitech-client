"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, TextField, Label, Input } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // UI only — no API integration
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Logo / Heading */}
        <div className="text-center mb-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome Back!
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <TextField name="email" type="email" isRequired>
              <Label className="text-sm font-medium text-gray-700">
                Email Address
              </Label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <Input
                  placeholder="Enter your email"
                  className="h-12 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </TextField>

            {/* Password */}
            <TextField name="password" isRequired>
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative mt-2">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-gray-200 pl-10 pr-12 text-sm outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </TextField>

            {/* Remember Me */}
            <label className="flex items-center gap-2 cursor-pointer w-fit">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 accent-blue-600"
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Sign In
              <ArrowRight size={18} />
            </Button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
