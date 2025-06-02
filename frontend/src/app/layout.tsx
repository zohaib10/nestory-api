import { Analytics } from "@vercel/analytics/next";

import { Footer, Header } from "@/components";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aeon Nestory",
  description: "what's your story?",
  icons: {
    icon: "/nestory-logo.png",
    shortcut: "/nestory-logo.png",
    apple: "/nestory-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-grow p-4 md:p-10 font-[family-name:var(--font-geist-sans)]">
            <Providers>{children}</Providers>
          </main>

          <Footer />
        </div>

        <Analytics />
      </body>
    </html>
  );
}
