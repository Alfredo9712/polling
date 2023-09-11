import "./globals.css";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";

import NextAuthProvider from "@/compononents/NextAuthProvider";
import Navbar from "@/compononents/ui/navbar";
import ReactQueryProvider from "@/compononents/ReactQueryProvider";

const siteFont = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "600", "800"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <ReactQueryProvider>
          <body className={`${siteFont.className} bg-gray-50 h-full px-10 `}>
            <div className="h-screen max-w-screen-xl mx-auto">
              <Navbar />
              {children}
            </div>
            <Toaster />
          </body>
        </ReactQueryProvider>
      </NextAuthProvider>
    </html>
  );
}
