/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e1e1e",
        secondary: "#AEB5BF",
        "secondary--light": "#D9D9D9",
        green: "#4BA468",
        "green--light": "rgba(75, 164, 104, 0.1)",
        yellow: "#FFCF52",
        "red-500": "#FF4040",
      },
    },
    container: {
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.25rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
  plugins: [],
};
