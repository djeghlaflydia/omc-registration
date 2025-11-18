"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Hero = () => {
  const pathname = usePathname();

  // Fonction utilitaire : renvoie la bonne couleur
  const getColor = (isActive: boolean) => (isActive ? "#251e14" : "#4a4132");

  // Get title based on pathname
  const getTitle = () => {
    switch (pathname) {
      case "/":
        return "The Call for New Wizards Begins!";
      case "/register":
        return "Join the Magic Circle!";
      default:
        return "Welcome to OMC!";
    }
  };

  // Get description based on pathname
  const getDescription = () => {
    switch (pathname) {
      case "/":
        return (
          <>
            Step into a world where technology meets magic <br /> Our mission to
            share knowledge, spark creativity, and bring students together
            through open source and scientific events.
          </>
        );
      case "/register":
        return <></>;
      default:
        return "Empowering students through technology and collaboration.";
    }
  };

  return (
    <div className="w-full">
      {/* Image de fond */}
      <div className="absolute inset-0 w-full z-[-1]">
        <img src="/header.svg" alt="header" className="w-full object-cover" />
      </div>

      <nav className="w-full inset-0 mt-5 md:mt-10 flex justify-center items-start">
        <ul className="w-full px-10 flex justify-center gap-4 md:gap-10 text-m md:text-2xl font-semibold">
          {/* HOME */}
          <li>
            <Link
              href="/"
              style={{ color: getColor(pathname === "/") }}
              className="transition-colors hover:opacity-80"
            >
              Home
            </Link>
          </li>

          {/* DEPARTEMENT (section dans home) */}
          <li>
            <Link
              href="/#departement"
              style={{
                color: getColor(
                  pathname === "/" &&
                    typeof window !== "undefined" &&
                    window.location.hash === "#departement",
                ),
              }}
              className="transition-colors hover:opacity-80"
            >
              Departement
            </Link>
          </li>

          {/* REGISTER (autre page) */}
          <li>
            <Link
              href="/register"
              style={{ color: getColor(pathname === "/register") }}
              className="transition-colors hover:opacity-80"
            >
              Register
            </Link>
          </li>

          {/* CONTACT (section dans home) */}
          <li>
            <Link
              href="/#contact"
              style={{
                color: getColor(
                  pathname === "/" &&
                    typeof window !== "undefined" &&
                    window.location.hash === "#contact",
                ),
              }}
              className="transition-colors hover:opacity-80"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Dynamic Title and Description */}
      <div className="text-center flex-col flex justify-center items-center mt-10 pb-10">
        <h1 className="text-7xl text-[#2F3729] magic-school">{getTitle()}</h1>
        <p
          className="text-xl headland mt-4 max-w-xl text-center text-[#2F3729]"
          style={{ fontFamily: "headland" }}
        >
          {getDescription()}
        </p>
      </div>
    </div>
  );
};

export default Hero;
