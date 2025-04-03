import { defineConfig } from "bunup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["cjs", "esm"],
  dts: true,
  minify: true,
  sourcemap: "linked",
  target: "node",
});
