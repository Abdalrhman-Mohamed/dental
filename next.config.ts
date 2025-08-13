import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**', // أي دومين
      },
      {
        protocol: 'https',
        hostname: '**', // أي دومين
      },
    ],
  },
};


export default nextConfig;
