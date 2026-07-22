import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root — an unrelated lockfile in the parent user
  // profile directory was otherwise making Next.js guess (and warn about) it.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
