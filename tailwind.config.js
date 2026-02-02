/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary colors from design system
        primary: {
          magenta: "#DC00D3",
          cyan: "#0CFFFF",
          dark: "#100425",
        },
        // Secondary colors
        secondary: {
          light: "#F8F8F8",
          field: "#FAFAFA",
        },
        // Legacy colors
        lavender: "#E9E4FF",
        blush: "#FDE2E4",
        "teal-soft": "#D1FAF0",
      },
      fontFamily: {
        heading: ["Josefin Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.06)",
        glow: "0 0 20px rgba(12, 255, 255, 0.3)",
        "glow-magenta": "0 0 20px rgba(220, 0, 211, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-btn": "linear-gradient(135deg, #DC00D3 0%, #0CFFFF 100%)",
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(12, 255, 255, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(220, 0, 211, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};
