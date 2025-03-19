// tailwind config is required for editor support

import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Config = {
  darkMode:"class",
  content: ["./app/**/*.tsx",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
          "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
      ],
  presets: [sharedConfig]
};

export default config;
