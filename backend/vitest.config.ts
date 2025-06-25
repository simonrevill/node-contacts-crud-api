import { coverageConfigDefaults, defineConfig } from "vitest/config";
import path from "path";

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
    },
    reporters: ["verbose"],
  },
  resolve: {
    alias: {
      shared: path.resolve(__dirname, "../shared/index.ts"),
    },
  },
});
