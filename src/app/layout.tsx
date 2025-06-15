import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Next Blog",
  description: "Exploring Tomorrows innovation one Byte at a time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="px-2 md:px-0">
          <Navbar />
          <div className="min-h-[calc(100vh-17vh)]">
            <div className="max-w-6xl mx-auto">{children}</div>
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
