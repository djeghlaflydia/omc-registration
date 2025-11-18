"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface PageBackgroundProps {
  children: ReactNode;
}

const PageBackground = ({ children }: PageBackgroundProps) => {
  const pathname = usePathname();

  // Determine which background class to apply based on pathname
  const getBackgroundClass = () => {
    switch (pathname) {
      case "/":
        return "";
      case "/register":
        return "page-background2";
      default:
        return "";
    }
  };

  return (
    <div className={`page-background ${getBackgroundClass()}`}>{children}</div>
  );
};

export default PageBackground;
