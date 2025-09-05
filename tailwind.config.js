/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        app: {
          white: "#FFFFFF",
          black: "#0A0A0A",
          red: {
            DEFAULT: "#DC2626", // main red
            light: "#EF4444",   // accent red
            dark: "#991B1B",
          },
          blue: {
            DEFAULT: "#1E3A8A", // dark blue
            dark: "#172554",
            light: "#3B82F6",
          },
          gray: {
            dark: "#1F1F1F",
            medium: "#4B5563",
            light: "#9CA3AF",
          },
        },
      },
    },
  },
  plugins: [],
}
