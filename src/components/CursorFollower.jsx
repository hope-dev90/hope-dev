import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * A soft, lagging cursor-follower dot that adds the "expensive agency" feel.
 * Hidden on touch devices.
 */
export default function CursorFollower() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Only on pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows instantly
      gsap.to(dot, {
        x: mouseX - 4,
        y: mouseY - 4,
        duration: 0.08,
        ease: "power3.out",
      });

      // Ring lags behind — this is what makes it feel "liquid"
      gsap.to(ring, {
        x: mouseX - 20,
        y: mouseY - 20,
        duration: 0.45,
        ease: "power3.out",
      });
    };

    // Magnetic hover on [data-magnetic] elements
    const onEnter = (e) => {
      gsap.to(ring, { scale: 2.8, opacity: 0.4, duration: 0.3, ease: "power3.out" });
      gsap.to(dot,  { scale: 0,   duration: 0.2 });
    };
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" });
      gsap.to(dot,  { scale: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove);

    const magnetics = document.querySelectorAll("[data-magnetic]");
    magnetics.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      magnetics.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring — lags */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] w-10 h-10 rounded-full border border-orange/70 pointer-events-none mix-blend-difference"
        style={{ transform: "translate(-9999px, -9999px)", willChange: "transform" }}
      />
      {/* Inner dot — instant */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-orange pointer-events-none"
        style={{ transform: "translate(-9999px, -9999px)", willChange: "transform" }}
      />
    </>
  );
}
