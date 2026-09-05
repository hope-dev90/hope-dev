/**
 * Central GSAP + ScrollTrigger setup.
 * Import this once at the app root — it registers plugins and exports
 * the configured gsap instance for use everywhere.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Custom premium eases used site-wide
export const EASE_OUT_EXPO  = "expo.out";
export const EASE_OUT_QUART = "power4.out";
export const EASE_INOUT     = "power3.inOut";

export { gsap, ScrollTrigger };
