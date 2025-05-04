import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["knex"],
  },
  images: {
    // in a production app, this should be restricted to allowed domains only
    remotePatterns: [{ protocol: "https", hostname: "*" }],
  },
};

export default nextConfig;
