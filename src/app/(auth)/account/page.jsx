"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input, Checkbox } from "@heroui/react";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CalendarDays,
  Heart,
  LoaderCircle,
  LogOut,
  Save,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";
import { authClient, signOut, signUp, useSession } from "@/lib/auth-client";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    setIsSubmitting(true);

    try {
      const { data, error } = await signUp.email({ name, email, password });

      if (error || !data) {
        toast.error(error?.message || "Could not create your account.");
        return;
      }

      toast.success("Account created successfully.");
      const next = new URLSearchParams(window.location.search).get("next");
      router.replace(next === "/cart" ? "/cart" : "/my-orders");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-12">
        <div role="status" className="flex items-center gap-3 text-sm text-slate-500">
          <LoaderCircle size={18} className="animate-spin" />
          Loading your account...
        </div>
      </main>
    );
  }

  if (session?.user) {
    return <ProfilePage user={session.user} />;
  }

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
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full cursor-pointer rounded-xl bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                "Creating account..."
              ) : (
                <>
                  Create Account
                  <ArrowRight size={17} />
                </>
              )}
            </button>
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

function ProfilePage({ user }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const initials = (user.name || user.email || "U")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const joinedDate = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Not available";

  const handleSave = async (event) => {
    event.preventDefault();
    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("Please enter your name.");
      return;
    }

    setIsSaving(true);
    try {
      const { data, error } = await authClient.updateUser({ name: updatedName });

      if (error || !data?.status) {
        toast.error(error?.message || "Could not update your profile.");
        return;
      }

      setName(updatedName);
      toast.success("Your profile has been updated.");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Could not update your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await signOut();
      if (error) {
        toast.error(error.message || "Could not sign out.");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Could not sign out.",
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <main className="min-h-[65vh] bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7">
          <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
            <Link href="/" className="transition hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <span className="font-medium text-slate-700">My Account</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your account details and access your shopping activity.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-2xl font-bold text-blue-700 ring-4 ring-blue-50/70">
                {initials}
              </div>
              <h2 className="mt-4 text-lg font-bold text-slate-900">
                {user.name || "UniTech customer"}
              </h2>
              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email}
              </p>
              <span
                className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                  user.emailVerified
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                <ShieldCheck size={14} />
                {user.emailVerified ? "Verified account" : "Email not verified"}
              </span>
            </div>

            <div className="mt-6 border-t border-slate-100 pt-5">
              <p className="flex items-center gap-2 text-sm text-slate-500">
                <CalendarDays size={16} />
                Member since <span className="font-medium text-slate-700">{joinedDate}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSigningOut ? (
                <LoaderCircle size={17} className="animate-spin" />
              ) : (
                <LogOut size={17} />
              )}
              {isSigningOut ? "Signing out..." : "Sign out"}
            </button>
          </aside>

          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Personal information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update the name associated with your account.
                </p>
              </div>

              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label
                    htmlFor="profile-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full name
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="profile-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      maxLength={100}
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profile-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      id="profile-email"
                      type="email"
                      value={user.email || ""}
                      readOnly
                      className="h-12 w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-500 outline-none"
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Email address changes are not available here.
                  </p>
                </div>

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-between">
                  <Link
                    href="/my-orders"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <ShoppingBag size={17} />
                    My orders
                  </Link>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? (
                      <LoaderCircle size={17} className="animate-spin" />
                    ) : (
                      <Save size={17} />
                    )}
                    {isSaving ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </section>

            <Link
              href="/wishlist"
              className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md sm:p-6"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                  <Heart size={20} />
                </span>
                <span>
                  <span className="block font-semibold text-slate-900">
                    Your wishlist
                  </span>
                  <span className="mt-1 block text-sm text-slate-500">
                    See products you saved for later.
                  </span>
                </span>
              </span>
              <ArrowRight size={18} className="text-slate-400" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
