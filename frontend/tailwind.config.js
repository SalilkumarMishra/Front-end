/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#82D173",
        primaryDark: "#6EBB5E",
        primaryLight: "#C9F2D9",
        darkText: "#1A1A1A",
        secondary: "#F4F4F4",
        accent: "#F8C94E"
      }
    }
  },
  plugins: [],
}
