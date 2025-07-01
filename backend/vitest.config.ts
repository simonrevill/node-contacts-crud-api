import { coverageConfigDefaults, defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    coverage: {
      provider: "v8",
      exclude: [
        ...coverageConfigDefaults.exclude,
        "src/server.ts",
        "src/domain/models",
        "src/types.ts",
        "src/**/*/index.ts",
        "./tests",
      ],
      thresholds: {
        100: true,
      },
    },
    reporters: ["verbose"],
  },
});
