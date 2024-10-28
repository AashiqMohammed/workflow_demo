/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: [
      {
        customTheme: {
          primary: "#004696",
          "primary-focus": "#003f87",
          "primary-content": "#ffffff",

          secondary: "#00BAA2",
          // "secondary-focus": "#00BAA2",
          // "secondary-content": "#ffffff",

          accent: "#525C79",
          "accent-focus": "#9EAEBD",
          "accent-content": "#ffffff",

          neutral: "#6F758A", //Post Job
          "neutral-focus": "#2a2e37",
          "neutral-content": "#ffffff",

          "base-100": "#ffffff",
          "base-200": "#F3F5FA",
          "base-300": "#9EAEBD",
          "base-content": "#303A58",

          info: "#1c92f2",
          success: "#009485",
          warning: "#ff9900",
          error: "#ff5724",

          "--rounded-box": "1rem",
          "--rounded-btn": ".5rem",
          "--rounded-badge": "1.9rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "none",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
  theme: {
    fontSize: {
      h1: "48px",
      h2: "48px",
      h3: "36px",
      h4: "28px",
      h5: "24px",
      "body-1": "18px",
      "body-2": "18px",
      "body-3": "16px",
      "body-4": "16px",
      "body-5": "14px",
      "body-6": "12px",
      source: "10px",
      "btn-1": "18px",
      "btn-2": "14px",
    },
    lineHeight: {
      h1: "58px",
      h2: "58px",
      h3: "43px",
      h4: "34px",
      h5: "29px",
      "body-1": "22px",
      "body-2": "22px",
      "body-3": "19px",
      "body-4": "19px",
      "body-5": "19px",
      "body-6": "18px",
      source: "12px",
      "btn-1": "17px",
      "btn-2": "17px",
    },
    fontWeight: {
      thin: 100,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    extend: {
      boxShadow: {
        normal: "0 2px 25px #a2b1b940",
      },
      colors: {
        primary: "#004696",
        blue: {
          600: "#3D7EC6",
          700: "#071D38",
          800: "#003f87",
          900: "#003878",
        },
        grey: {
          800: "#616161",
        },
        dark: {
          100: "#6F758A",
          200: "#525C79",
          300: "#414C6C",
          400: "#303A58",
          500: "#1B2850",
          700: "#6E6F87",
          800: "#212121",
          900: "#18171D",
        },
        white: {
          800: "#F8F8F8",
          900: "#fff",
        },
        red: {
          900: "#CE1D1D",
        },
        info: "rgba(28, 58, 167, 0.05)",
      },
    },
  },
  plugins: [require("daisyui")],
};
