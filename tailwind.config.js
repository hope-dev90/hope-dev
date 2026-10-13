/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      screens: {
        xs: "390px",
      },
      colors: {
        navy: "#1a1a2e",
        orange: {
          DEFAULT: "#780000",
          dark: "#5e0000",
        },
        cream: "#fdf6f0",
        blush: "#f5e6e8",
        lavender: "#f5f0f0",
      },
      fontFamily: {
        sans: ["Urbanist", "ui-sans-serif", "system-ui", "sans-serif"],
        heading: ["Bricolage Grotesque", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 32px -8px rgba(26,26,46,0.18)",
        card: "0 2px 16px 0 rgba(26,26,46,0.08)",
      },
    },
  },
  plugins: [],
};
