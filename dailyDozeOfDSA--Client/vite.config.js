import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://localhost:3000",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // "https://dailydozeofdsa.com",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
