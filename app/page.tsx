"use client";

import Hero from "./components/hero";
import FlipClock from "./components/flip-clock";
import EventsPic from "./components/eventsPic";
import Link from "next/link";
import Departement from "./components/departement"; 
import Contact from "./components/contact";

export default function Home() {
  return (
    <div className="">
      <div className="flex flex-col items-center justify-center mt-8">
        <Link href="/register" className="inline-block">
          <img
            src="/button.svg"
            alt="Wizard Illustration"
            className="mx-auto mt-16 md:w-[18vw] hover:scale-105 transition-transform duration-300 cursor-pointer"
          />
        </Link>
      </div>
      <EventsPic />

      <div className="p-[50em]"></div>
    </div>
  );
}
