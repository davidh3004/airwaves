/** @type {import('next').NextConfig} */
const basePath = process.env.BASE_PATH ?? "";

const nextConfig = {
  basePath,
  assetPrefix: basePath,
  images: {
    domains: [],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
