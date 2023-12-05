import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#050505",
          secondary: "#920000",
          accent: "#ffffff",
          neutral: "#dfa63f",
          "base-100": "#ffffff",
          info: "#5dade2",
          success: "#58D68D",
          warning: "#F8c471",
          error: "#e74c3c",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

export default withUt(config);
