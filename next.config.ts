import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enables additional checks for hydration mismatches
  webpack(config, { isServer }) {
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: "html-loader",
      });
    }

    return config;
  },
};

export default nextConfig;
