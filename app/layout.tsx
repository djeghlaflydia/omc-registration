import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Headland_One } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
