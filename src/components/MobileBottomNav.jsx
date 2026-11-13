"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PhoneCall, House, Store, ShoppingCart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/components/cart/CartProvider";

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
    label: "Cart",
    href: "/cart",
    icon: ShoppingCart,
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount: cartCount } = useCart();

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
                {item.label === "Cart" && cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
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
            <Link
              key={item.label}
              href={item.href}
              aria-label={
                item.label === "Cart"
                  ? `Shopping cart, ${cartCount} items`
                  : item.label
              }
            >
              {content}
            </Link>
          );
        })}
      </div>

      <div className="h-[env(safe-area-inset-bottom)] bg-white" />
    </nav>
  );
}
