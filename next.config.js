/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Disable static optimization for API routes that use dynamic features
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs']
  }
};

module.exports = nextConfig;
