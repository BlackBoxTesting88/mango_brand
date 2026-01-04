/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./en/index.html",
    "./sr/index.html",
    "./sections/**/*.{html,js}",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a1816",
        parchment: "#F0F8FF",
        parchmentDeep: "#E8F4F8",
        brass: "#B8860B",
        gold: "#D4AF37",
        amber: "#FF8C00",
        slate: "#4A4845",
        cream: "#E0F0F5",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(0,0,0,.08)",
        glow: "0 0 40px rgba(212,175,55,.2)",
        luxury: "0 30px 80px rgba(0,0,0,.15)",
        inner: "inset 0 2px 20px rgba(0,0,0,.05)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "fade-in": "fadeIn 1s ease-out",
        "slide-up": "slideUp 0.8s ease-out",
        "scale-in": "scaleIn 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".7" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
