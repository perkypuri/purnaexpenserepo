import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/admin": {
        target: "http://localhost:2006", // Spring Boot backend
        changeOrigin: true,
        secure: false,
      },
      "/users": {
        target: "http://localhost:2006",
        changeOrigin: true,
        secure: false,
      },
      "/supervisor": {
        target: "http://localhost:2006",
        changeOrigin: true,
        secure: false,
      },
      "/supervisorRequests": {
        target: "http://localhost:2006",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
