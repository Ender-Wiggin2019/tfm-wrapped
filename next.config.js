/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["ph-files.imgix.net"],
  },
};

module.exports = nextConfig;
