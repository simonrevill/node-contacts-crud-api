import {
  configDefaults,
  coverageConfigDefaults,
  defineConfig,
} from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    reporters: ["verbose"],
    include: [...configDefaults.include, "tests"],
    exclude: [...configDefaults.exclude, "e2e"],
    coverage: {
      exclude: [
        ...coverageConfigDefaults.exclude,
        "e2e",
        "playwright-report",
        "playwright.config.ts",
        "src/types.ts",
      ],
    },
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, "../shared/index.ts"),
    },
  },
});
