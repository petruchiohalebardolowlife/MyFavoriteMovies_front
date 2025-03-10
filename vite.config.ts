import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@services": path.resolve(__dirname, "src/services"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@components": path.resolve(__dirname, "src/components"),
      "@contexts": path.resolve(__dirname, "src/contexts"),
      "@middlewares": path.resolve(__dirname, "src/middlewares"),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ["@lingui/babel-plugin-lingui-macro"],
      },
    }),
    tailwindcss(),
    lingui(),
  ],
});
