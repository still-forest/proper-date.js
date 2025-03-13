import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.{test,spec}.{ts,js}"],
    coverage: {
      include: ["lib/**/*"],
      exclude: ["lib/index.ts"],
      reporter: ["text", "json", "html"],
    },
  },
});
