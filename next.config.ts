import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    // Only apply the rule for client-side code (not server-side)
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader',
      });
    }

    return config;
  },
};

export default nextConfig;
