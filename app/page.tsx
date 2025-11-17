"use client";

import Hero from "./components/hero";
import FlipClock from "./components/flip-clock";

export default function Home() {
  return (
    <div className="page-background">
      <Hero />
      <div className="flex flex-col items-center justify-center">
        <FlipClock />
      </div>
    </div>
  );
}
