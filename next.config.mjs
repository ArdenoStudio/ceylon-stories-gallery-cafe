/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [70, 75, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
