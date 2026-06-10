import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A2A6E",
          deep: "#05153A",
          dark: "#040E26",
        },
        sky: {
          brand: "#00AEEF",
        },
        red: {
          brand: "#F72D36",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        serif: ["Syne", "Georgia", "serif"],
      },
      boxShadow: {
        // Soft premium glow used on CTAs and active cards
        glow: "0 0 0 1px rgba(0,174,239,0.15), 0 8px 40px -8px rgba(0,174,239,0.35)",
        "glow-red":
          "0 0 0 1px rgba(247,45,54,0.18), 0 8px 40px -8px rgba(247,45,54,0.4)",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        // Slow drifting aurora/gradient mesh for section backgrounds
        aurora: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%,-6%,0) scale(1.15)" },
          "66%": { transform: "translate3d(-5%,4%,0) scale(0.9)" },
        },
        // Gentle vertical float for cooling particles / badges
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-22px) translateX(10px)" },
        },
        // Infinite horizontal scroll for the trust marquee
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        // Sweep highlight for glass surfaces and buttons
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        // Animated gradient position (hero headline / borders)
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Pulsing glow ring for the sticky emergency button
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(247,45,54,0.45)" },
          "70%": { boxShadow: "0 0 0 14px rgba(247,45,54,0)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        // Flowing airflow ribbon dash animation
        flowDash: {
          to: { strokeDashoffset: "-1000" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        aurora: "aurora 18s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "floatSlow 11s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "glow-pulse": "glowPulse 2.4s ease-out infinite",
        "spin-slow": "spinSlow 14s linear infinite",
        "flow-dash": "flowDash 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
