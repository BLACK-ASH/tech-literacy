"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // seconds for one full pass
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  direction = "left",
  speed = 20,
  pauseOnHover = true,
  className,
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const timeline = useRef<GSAPTimeline | null>(null);

  useGSAP(() => {
    if (!marqueeRef.current) return;

    const fromX = direction === "left" ? 0 : -50;
    const toX = direction === "left" ? -50 : 0;

    timeline.current = gsap
      .timeline({ repeat: -1, defaults: { ease: "none" } })
      .fromTo(
        marqueeRef.current,
        { xPercent: fromX },
        { xPercent: toX, duration: speed }
      );

    return () => {
      timeline.current?.kill();
    };
  }, [direction, speed]);

  const handleEnter = () => {
    if (!pauseOnHover) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    timeline.current && gsap.to(timeline.current, { timeScale: 0.25, duration: 0.3 });
  };

  const handleLeave = () => {
    if (!pauseOnHover) return;
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    timeline.current && gsap.to(timeline.current, { timeScale: 1, duration: 0.3 });
  };

  return (
    <div
      className={cn("overflow-hidden w-full", className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div ref={marqueeRef} className="flex gap-6 w-max">
        {/* Duplicate children for seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
}
