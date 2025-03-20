/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "brand-primary": {
          50: "var(--color-primary-50)",
          100: "var(--color-primary-100)",
          200: "var(--color-primary-200)",
          300: "var(--color-primary-300)",
          400: "var(--color-primary-400)",
          500: "var(--color-primary-500)",
          600: "var(--color-primary-600)",
          700: "var(--color-primary-700)",
          800: "var(--color-primary-800)",
          900: "var(--color-primary-900)",
          950: "var(--color-primary-950)",
        },
        "brand-bg": {
          light: "var(--color-bg-light)",
          DEFAULT: "var(--color-bg-default)",
          dark: "var(--color-bg-dark)",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        display: ["var(--font-heading)"],
      },
      fontSize: {
        "display-lg": [
          "3.75rem",
          { lineHeight: "1.2", letterSpacing: "-0.02em" },
        ],
        "display-md": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.02em" }],
        "display-sm": [
          "2.25rem",
          { lineHeight: "1.3", letterSpacing: "-0.02em" },
        ],
        "heading-lg": ["2rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "heading-md": [
          "1.75rem",
          { lineHeight: "1.4", letterSpacing: "-0.01em" },
        ],
        "heading-sm": [
          "1.5rem",
          { lineHeight: "1.4", letterSpacing: "-0.01em" },
        ],
      },
    },
  },
  mode: "jit",
  corePlugins: {
    preflight: true,
  },
  plugins: [require("tailwind-corner-smoothing")],
};
