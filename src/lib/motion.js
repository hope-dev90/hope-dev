// Shared animation variants for the whole site

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

export const fadeRight = {
  hidden: { opacity: 0, x: -36 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const fadeLeft = {
  hidden: { opacity: 0, x: 36 },
  show: (delay = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  show: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

export const cardHover = {
  rest: { y: 0, boxShadow: "0 2px 16px 0 rgba(27,42,74,0.08)" },
  hover: {
    y: -6,
    boxShadow: "0 16px 40px -8px rgba(27,42,74,0.18)",
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
};

// Hook: wraps IntersectionObserver for scroll-triggered animations
// Usage: const { ref, inView } = useScrollReveal()
export { useInView } from "framer-motion";
