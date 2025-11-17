"use client";

import { useEffect, useRef } from "react";

export default function FlipClock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalsRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Target date: November 20th, 2025 at 8:00 PM
    const targetDate = new Date("2025-11-20T20:00:00");

    const configs = [
      {
        name: "day-tens",
        flip: container.querySelector(
          ".flip-clock.down.day-tens",
        ) as HTMLElement,
        front: container.querySelector(".day-tens .front") as HTMLElement,
        back: container.querySelector(".day-tens .back") as HTMLElement,
        getValue: () => {
          const now = new Date();
          const diff = targetDate.getTime() - now.getTime();
          const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
          return Math.floor(days / 10);
        },
      },
      {
        name: "day-ones",
        flip: container.querySelector(
          ".flip-clock.down.day-ones",
        ) as HTMLElement,
        front: container.querySelector(".day-ones .front") as HTMLElement,
        back: container.querySelector(".day-ones .back") as HTMLElement,
        getValue: () => {
          const now = new Date();
          const diff = targetDate.getTime() - now.getTime();
          const days = Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
          return days % 10;
        },
      },
      {
        name: "hour-tens",
        flip: container.querySelector(
          ".flip-clock.down.hour-tens",
        ) as HTMLElement,
        front: container.querySelector(".hour-tens .front") as HTMLElement,
        back: container.querySelector(".hour-tens .back") as HTMLElement,
        getValue: () => {
          const now = new Date();
          const diff = targetDate.getTime() - now.getTime();
          const hours = Math.max(
            0,
            Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          );
          return Math.floor(hours / 10);
        },
      },
      {
        name: "hour-ones",
        flip: container.querySelector(
          ".flip-clock.down.hour-ones",
        ) as HTMLElement,
        front: container.querySelector(".hour-ones .front") as HTMLElement,
        back: container.querySelector(".hour-ones .back") as HTMLElement,
        getValue: () => {
          const now = new Date();
          const diff = targetDate.getTime() - now.getTime();
          const hours = Math.max(
            0,
            Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          );
          return hours % 10;
        },
      },
      {
        name: "minute-tens",
        flip: container.querySelector(
          ".flip-clock.down.minute-tens",
        ) as HTMLElement,
        front: container.querySelector(".minute-tens .front") as HTMLElement,
        back: container.querySelector(".minute-tens .back") as HTMLElement,
        getValue: () => {
          const now = new Date();
          const diff = targetDate.getTime() - now.getTime();
          const minutes = Math.max(
            0,
            Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          );
          return Math.floor(minutes / 10);
        },
      },
      {
        name: "minute-ones",
        flip: container.querySelector(
          ".flip-clock.down.minute-ones",
        ) as HTMLElement,
        front: container.querySelector(".minute-ones .front") as HTMLElement,
        back: container.querySelector(".minute-ones .back") as HTMLElement,
        getValue: () => {
          const now = new Date();
          const diff = targetDate.getTime() - now.getTime();
          const minutes = Math.max(
            0,
            Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          );
          return minutes % 10;
        },
      },
    ];

    const lastNumbers: Record<string, number> = {
      "day-tens": -1,
      "day-ones": -1,
      "hour-tens": -1,
      "hour-ones": -1,
      "minute-tens": -1,
      "minute-ones": -1,
    };

    function flipDown(config: any) {
      const currentNumber = config.getValue();

      if (currentNumber !== lastNumbers[config.name]) {
        lastNumbers[config.name] = currentNumber;

        const formatted = currentNumber.toString();
        config.back.dataset.number = formatted;

        config.flip.classList.add("go");

        setTimeout(() => {
          config.flip.classList.remove("go");
          config.front.dataset.number = formatted;
        }, 600);
      }
    }

    function tick() {
      configs.forEach((c) => flipDown(c));
    }

    // Initial tick to set values immediately
    tick();

    intervalsRef.current = setInterval(tick, 2000);

    // Cleanup
    return () => {
      if (intervalsRef.current) clearInterval(intervalsRef.current);
    };
  }, []);

  return (
    <div
      className="clock-container flex justify-center items-center gap-15"
      ref={containerRef}
    >
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center gap-5">
          <div className="flip-clock down day-tens">
            <div className="digital front" data-number="0"></div>
            <div className="digital back" data-number="0"></div>
          </div>

          <div className="flip-clock down day-ones">
            <div className="digital front" data-number="0"></div>
            <div className="digital back" data-number="0"></div>
          </div>
        </div>

        <p className="clock-label text-center magic-school text-5xl text-[rgba(47,55,41,1)]">
          Days
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center gap-5">
          <div className="flip-clock down hour-tens">
            <div className="digital front" data-number="0"></div>
            <div className="digital back" data-number="0"></div>
          </div>

          <div className="flip-clock down hour-ones">
            <div className="digital front" data-number="0"></div>
            <div className="digital back" data-number="0"></div>
          </div>
        </div>

        <p className="clock-label text-center magic-school text-5xl text-[rgba(47,55,41,1)]">
          Hours
        </p>
      </div>

      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center gap-5">
          <div className="flip-clock down minute-tens">
            <div className="digital front" data-number="0"></div>
            <div className="digital back" data-number="0"></div>
          </div>

          <div className="flip-clock down minute-ones">
            <div className="digital front" data-number="0"></div>
            <div className="digital back" data-number="0"></div>
          </div>
        </div>

        <p className="clock-label text-center magic-school text-5xl text-[rgba(47,55,41,1)]">
          Minutes
        </p>
      </div>
    </div>
  );
}
