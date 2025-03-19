import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";

const config: Config = {
  content: ["./src/**/*.tsx"],
  prefix: "ui-",
  presets: [sharedConfig],
  theme:{
    extend:{
      colors:{
        customGray: "#0B0B0A"
      }
    }
  }

};

export default config;
