import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "UniTech",
  description: "Your Campus Tech Store",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <MainLayout>{children}</MainLayout>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid #e2e8f0",
              borderRadius: "10px",
              boxShadow: "0 12px 32px rgb(15 23 42 / 12%)",
            },
          }}
        />
      </body>
    </html>
  );
}
