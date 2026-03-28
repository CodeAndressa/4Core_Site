import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/e',
        destination: '/',
        permanent: false,
      },
    ]
  },
};

export default nextConfig;
