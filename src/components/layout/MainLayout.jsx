"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MainLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute =
    pathname === "/dashboard" || pathname.startsWith("/dashboard/");

  if (isAdminRoute) {
    return children;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
