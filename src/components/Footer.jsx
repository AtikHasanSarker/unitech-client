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
        <div className="grid grid-cols-1 gap-12 py-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Brand Information */}
          <div className="lg:col-span-4">
            <Link
              href="/"
              aria-label="UniTech homepage"
              className="inline-flex items-center gap-3"
            >
              <div className="relative h-20 w-50 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src="/logo.png"
                  alt="UniTech logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="max-w-sm text-sm leading-5 text-slate-400">
              Your trusted destination for quality mobile accessories. Discover
              useful gadgets, explore great deals, and upgrade your everyday
              tech experience with UniTech.
            </p>

            {/* Location */}
            <div className="mt-5 flex items-start gap-3 text-sm text-slate-400">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />

              <p>NSTU Campus, Noakhali, Bangladesh</p>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
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
        <div className="flex flex-col mb-15 gap-3 border-t border-white/[0.08] py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            ©2026 UniTech | All Rights Reserved.
          </p>

          <div className="flex text-slate-300 text-sm justify-center sm:justify-end">
            Design & Developed by{" "}
            <Link
              href="https://atikhasan-dev.vercel.app"
              target="_blank"
              className="font-bold text-violet-600"
            >
              {" "}
              {"<Atik Hasan Sarker />"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
