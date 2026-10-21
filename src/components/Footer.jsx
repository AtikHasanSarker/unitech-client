import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Special Deals", href: "/deals" },
    { label: "New Arrivals", href: "/products?sort=newest" },
  ],
  "Quick Links": [
    { label: "My Account", href: "/account" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Track Order", href: "/track-order" },
    { label: "Contact Us", href: "/contact" },
  ],
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "FAQs", href: "/faq" },
    { label: "Return Policy", href: "/return-policy" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};

const socialLinks = [
  {
    icon: FaFacebook,
    href: "#",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "#",
    label: "Instagram",
  },
  {
    icon: FaYoutube,
    href: "#",
    label: "YouTube",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#060d18] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-blue-600/[0.08] blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10 lg:py-20">
          {/* Brand Information */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="UniTech homepage"
              className="inline-flex items-center gap-3"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/images/logo.png"
                  alt="UniTech logo"
                  fill
                  sizes="44px"
                  className="object-contain"
                />
              </div>

              <span className="text-2xl font-bold tracking-tight">
                Uni<span className="text-blue-500">Tech</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Your trusted destination for quality mobile accessories. Discover
              useful gadgets, explore great deals, and upgrade your everyday
              tech experience with UniTech.
            </p>

            {/* Location */}
            <div className="mt-6 flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

              <p>
                NSTU Campus
                <br />
                Noakhali, Bangladesh
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-400 transition-all duration-200 hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Link Groups */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="lg:col-span-2">
              <h3 className="text-sm font-semibold tracking-wide text-white">
                {title}
              </h3>

              <ul className="mt-6 space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-blue-400"
                    >
                      {link.label}

                      <ArrowUpRight
                        size={13}
                        className="opacity-0 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Card */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold tracking-wide text-white">
              Get in Touch
            </h3>

            <p className="mt-6 text-sm leading-6 text-slate-400">
              Have questions about a product or need help with your order?
              Contact our team.
            </p>

            <div className="mt-5 space-y-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                Contact Support
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 border-t border-white/[0.08] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            ©2026 UniTech. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-slate-500 sm:justify-end">
            <Link
              href="/privacy-policy"
              className="transition-colors hover:text-slate-300"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="transition-colors hover:text-slate-300"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/return-policy"
              className="transition-colors hover:text-slate-300"
            >
              Returns
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
