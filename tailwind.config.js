module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cingur: ["var(--font-cingur)"],
        headland: ["var(--font-headland)"],
      },
    },
  },
  plugins: [],
};
