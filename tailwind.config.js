/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00BAF2",
        secondary: "#002970",
        /** Rewardz / MPPS — flat keys so utilities like bg-bo-sidebar always generate */
        "bo-sidebar": "#4F46E5",
        "bo-accent": "#6366F1",
        "bo-orange": "#F97316",
        surface: "#F7F9FC",
        muted: {
          navy: "#4A5B7A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        btn: "8px",
      },
      spacing: {
        18: "4.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0, 41, 112, 0.08), 0 4px 12px rgba(0, 41, 112, 0.06)",
      },
    },
  },
  plugins: [],
};
