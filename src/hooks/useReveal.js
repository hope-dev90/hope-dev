import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, EASE_OUT_EXPO } from "../lib/gsap";

/**
 * useReveal — scroll-triggered staggered reveal for any group of elements.
 *
 * Usage:
 *   const ref = useReveal();
 *   <section ref={ref} data-reveal>
 *     <div data-reveal-item>...</div>
 *     <div data-reveal-item>...</div>
 *   </section>
 *
 * Or use data-reveal-heading on a heading to get the line-clip treatment.
 */
export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = ref.current;
      if (!el) return;

      // Staggered items
      const items = el.querySelectorAll("[data-reveal-item]");
      if (items.length) {
        gsap.fromTo(
          items,
          { y: 60, opacity: 0, filter: "blur(4px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: options.duration ?? 1,
            stagger: options.stagger ?? 0.1,
            ease: EASE_OUT_EXPO,
            scrollTrigger: {
              trigger: el,
              start: options.start ?? "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Heading clip-reveal
      const headings = el.querySelectorAll("[data-reveal-heading]");
      headings.forEach((h) => {
        gsap.fromTo(
          h,
          { y: "110%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 1.1,
            ease: EASE_OUT_EXPO,
            scrollTrigger: {
              trigger: h,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
