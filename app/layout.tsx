import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const headland = localFont({
  src: "../public/fonts/headland-one-latin-400-normal.ttf",
  variable: "--font-headland",
  weight: "400",
  style: "normal",
});

export const metadata: Metadata = {
  title: "OMC Registration",
  description: "The Call for New Wizards Begins!",
  icons: {
    icon: "/omc.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${headland.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
