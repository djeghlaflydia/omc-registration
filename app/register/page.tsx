"use client";

import Hero from "../components/hero";
import FlipClock from "../components/flip-clock";
import RegistrationForm from "../components/RegistrationForm";

export default function Home() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="p-5"></div>
      <RegistrationForm />
    </div>
  );
}
