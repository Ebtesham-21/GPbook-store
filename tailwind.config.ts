/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // Scan all files in src for Tailwind classes
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // Deep blue for primary accents
        secondary: "#9333EA", // Purple for contrast
        accent: "#F59E0B", // Yellow-orange for highlights
        background: "#F3F4F6", // Light gray background
        textDark: "#1F2937", // Dark gray for text
        textLight: "#6B7280", // Light gray for secondary text
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Merriweather", "serif"],
      },
      spacing: {
        18: "4.5rem",
      },
      boxShadow: {
        card: "0 4px 10px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
