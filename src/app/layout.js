import { Albert_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "UniTech",
  description: "Your Campus Tech Store",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${albertSans.className} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
