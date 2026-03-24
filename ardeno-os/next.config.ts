import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.supabase.co' },
      { protocol: 'https', hostname: '**.vercel-storage.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb' // To handle large trace/log uploads §43
    }
  },
  // Enable production-grade observability (§39)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
