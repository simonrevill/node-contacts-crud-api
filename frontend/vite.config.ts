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
  resolve: {
    alias: [
      {
        find: "useCases",
        replacement: path.resolve(__dirname, "src/contacts/useCases/index.ts"),
      },
      {
        find: "test-utils",
        replacement: path.resolve(__dirname, "tests/contacts/test-utils.tsx"),
      },
      {
        find: "components",
        replacement: path.resolve(
          __dirname,
          "src/contacts/components/index.ts"
        ),
      },
      {
        find: "views",
        replacement: path.resolve(__dirname, "src/contacts/views/index.ts"),
      },
    ],
  },
  test: {
    css: true,
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    reporters: ["verbose"],
    include: [...configDefaults.include, "tests"],
    exclude: [...configDefaults.exclude, "e2e"],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "e2e",
        "playwright-report",
        "playwright.config.ts",
        "src/App.tsx",
        "src/main.tsx",
        "src/theme.ts",
        "src/types.ts",
        "src/utils.ts",
        "**/*/index.ts",
      ],
      thresholds: {
        100: true,
      },
    },
  },
});
