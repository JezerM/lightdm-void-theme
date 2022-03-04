import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  build: {
    sourcemap: false,
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        secondary: path.resolve(__dirname, "secondary.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vue()],
});
