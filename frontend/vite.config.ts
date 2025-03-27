import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@interfaces": path.resolve(__dirname, "src/shared/models/interfaces"),
      "@types": path.resolve(__dirname, "src/shared/models/types"),
      "@enums": path.resolve(__dirname, "src/shared/enums"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@utils": path.resolve(__dirname, "src/shared/utils"),
    },
  },
});
