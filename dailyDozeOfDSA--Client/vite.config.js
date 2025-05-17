import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/", // this is the default value
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // replace with your backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
