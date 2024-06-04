/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "incredible-pika-38.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
