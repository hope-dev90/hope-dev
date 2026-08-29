/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1b2a4a",
        orange: {
          DEFAULT: "#e8622c",
          dark: "#d65420",
        },
        cream: "#fdf1ec",
        blush: "#fde8e0",
        lavender: "#f0eefa",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 8px 32px -8px rgba(27,42,74,0.18)",
        card: "0 2px 16px 0 rgba(27,42,74,0.08)",
      },
    },
  },
  plugins: [],
};
