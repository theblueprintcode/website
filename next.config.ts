import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  // Top-level in Next 16 — under `experimental` it is silently ignored, and
  // Turbopack then infers the workspace root from the parent package-lock.
  turbopack: {
    root: '../',
  },
};

export default withMDX(nextConfig);
