"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneCall, House, Store, Tag } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const navItems = [
  {
    label: "Phone",
    href: "tel:01604498384",
    icon: PhoneCall,
    type: "external",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/+8801604498384",
    icon: FaWhatsapp,
    type: "external",
  },
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "Shop",
    href: "/products",
    icon: Store,
  },
  {
    label: "Deals",
    href: "/deals",
    icon: Tag,
  },
];

export default function MobileBottomNav({ cartCount = 0 }) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white md:hidden">
      <div className="mx-auto grid h-[68px] max-w-lg grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/"
              ? pathname === "/"
              : item.type !== "external" && pathname.startsWith(item.href);

          const content = (
            <div
              className={`relative flex h-full flex-col items-center justify-center gap-1 transition-colors ${
                isActive ? "text-blue-600" : "text-gray-700"
              }`}
            >
              <div className="relative">
                <Icon size={20} strokeWidth={2} />
              </div>

              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          );

          return item.type === "external" ? (
            <a
              key={item.label}
              href={item.href}
              target={item.label === "WhatsApp" ? "_blank" : undefined}
              rel="noopener noreferrer"
            >
              {content}
            </a>
          ) : (
            <Link key={item.label} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>

      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </nav>
  );
}
