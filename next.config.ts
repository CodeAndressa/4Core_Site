import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
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

// force nextjs turbopack hard reboot
