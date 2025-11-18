import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Headland_One } from "next/font/google";
import "./globals.css";
import FlipClock from "./components/flip-clock";
import Hero from "./components/hero";
import PageBackground from "./components/page-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const headland = Headland_One({
  variable: "--font-headland",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "OMC Registration",
  description: "The Call for New Wizards Begins!",
  icons: {
    icon: "/omc.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headland.variable} antialiased`}
      >
        <PageBackground>
          <Hero />
          <div className="flex flex-col items-center justify-center">
            <FlipClock />
          </div>

          {children}
        </PageBackground>
      </body>
    </html>
  );
}
