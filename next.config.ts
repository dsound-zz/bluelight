import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Stray lockfiles in parent directories (~/Development, ~) make Turbopack misdetect the
  // workspace root, which breaks React Client Manifest resolution against pnpm's node_modules.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
