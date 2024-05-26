/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "'Inter, sans-serif'",
      },
      colors: {
        mainBackgroundColor: "#0D1117",
        columnBackgroundColor: "#161C22",
      },
    },
  },
  plugins: [],
};
