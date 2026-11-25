"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextField, Label, Input } from "@heroui/react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const handleGoogleSignIn = async () => {
    const next = new URLSearchParams(window.location.search).get("next");
    const callbackURL = next === "/cart" ? "/cart" : "/my-orders";

    setIsGoogleSubmitting(true);
    try {
      const { error } = await signIn.social({
        provider: "google",
        callbackURL,
        newUserCallbackURL: callbackURL,
      });

      if (error) {
        toast.error("Could not continue with Google.");
      }
    } catch (error) {
      toast.error("Could not continue with Google.");
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    setIsSubmitting(true);

    try {
      const { data, error } = await signIn.email({
        email,
        password,
        rememberMe,
      });

      if (error || !data) {
        toast.error("Email or password is incorrect.");
        return;
      }

      toast.success("Sign in successful.");
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next === "/cart" ? "/cart" : "/my-orders");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Sign in failed. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
                <Input
                  id="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="h-12 w-full rounded-xl border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
            </TextField>

            {/* Password */}
            <TextField name="password" isRequired>
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
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
                  id="password"
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
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
            <button
              type="submit"
              disabled={isSubmitting || isGoogleSubmitting}
              className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-600 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs text-slate-400">OR</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting || isGoogleSubmitting}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGoogleSubmitting ? (
              <LoaderCircle size={18} className="animate-spin" />
            ) : (
              <FcGoogle size={20} />
            )}
            {isGoogleSubmitting
              ? "Connecting to Google..."
              : "Continue with Google"}
          </button>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/account"
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
