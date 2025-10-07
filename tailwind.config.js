// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ Corrected: match all nested files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};