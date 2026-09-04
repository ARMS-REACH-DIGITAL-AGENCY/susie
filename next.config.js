/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
  },
  experimental: {
    serverComponentsExternalPackages: ["sanitize-html"],
  },
};

module.exports = nextConfig;
