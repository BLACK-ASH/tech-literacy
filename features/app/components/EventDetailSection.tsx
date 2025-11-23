"use client";

import type { Event } from "@/lib/eventData";
import EventDetailSlide from "./EventDetailSlide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EventDetailSection = ({ events }: { events: Event[] }) => {
  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>("section.event-slide");

    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        snap: 1, // snaps to next pinned section
      });
    });
  }, []);

  return (
    <div className="relative">
      {events.map((event) => (
        <EventDetailSlide key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventDetailSection;

