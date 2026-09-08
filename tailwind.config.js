/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14151A",
        muted: "#6B6F7B",
        surface: "#FFFFFF",
        bg: "#F7F7F5",
        border: "#E4E4E2",
        primary: {
          DEFAULT: "#3452FF",
          dark: "#2338CC",
          light: "#EEF0FF",
        },
        danger: "#D64545",
        success: "#1E874B",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 21, 26, 0.04), 0 8px 24px rgba(20, 21, 26, 0.06)",
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};
