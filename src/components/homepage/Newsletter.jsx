"use client";

import { useState } from "react";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Button, Input } from "@heroui/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    // TODO: Connect to your newsletter subscription API.
    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="bg-[#f8fafc] px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden rounded-3xl bg-[#07111e] px-5 py-10 text-white sm:px-10 sm:py-14 lg:px-16 lg:py-16">
        {/* Background Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />
          <div className="absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(37,99,235,0.12),transparent_55%)]" />
        </div>

        <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Text */}
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-semibold text-blue-300">
              <Sparkles size={14} />
              STAY CONNECTED
            </div>

            <h2 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
              Get the Latest
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Tech Updates
              </span>
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
              Subscribe to hear about new arrivals, special offers, and
              mobile accessories worth checking out.
            </p>
          </div>

          {/* Subscription Form */}
          <div className="w-full max-w-lg lg:max-w-md">
            {subscribed ? (
              <div
                role="status"
                className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-5"
              >
                <p className="font-semibold text-emerald-300">
                  Thanks for your interest!
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  The demo form accepted your submission. Actual subscription
                  requires backend integration.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label
                  htmlFor="newsletter-email"
                  className="mb-3 block text-sm font-medium text-slate-200"
                >
                  Subscribe to our newsletter
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:rounded-full sm:border sm:border-white/10 sm:bg-white/[0.05] sm:p-1.5">
                  <div className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 sm:border-0 sm:bg-transparent">
                    <Mail
                      size={18}
                      className="shrink-0 text-slate-400"
                    />

                    <input
                      id="newsletter-email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      autoComplete="email"
                      required
                      className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-12 shrink-0 rounded-full bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-500"
                  >
                    Subscribe
                    <ArrowRight size={17} className="ml-2" />
                  </Button>
                </div>

                <p className="mt-3 text-xs leading-5 text-slate-500">
                  No spam. Just product updates and offers.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
