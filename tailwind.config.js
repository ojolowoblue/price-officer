/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A27B5",
        "primary-light": "#F1EEFB",
        background: "#FFF",
        foreground: "#2E2E3A",
        border: "#E5E7EB",
        divider: "#F2F4F7",
        placeholder: "#6B7280",
        ring: "#4A27B5",
        input: "#F0F2F5",
        muted: "#616F84"
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(90deg, rgba(97, 111, 132, 0.8) 0%, rgba(97, 111, 132, 0.2) 100%)',
      },
      keyframes: {
        "full-width": { to: { width: "100%" } },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease",
        preflight: "full-width 2s ease-in-out infinite",
      },

    },
  },
  plugins: [require("tailwindcss-animate")],
}