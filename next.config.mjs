/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],  // Add external domains here
  },
  typescript: {
    ignoreBuildErrors: true,  // This will ignore TypeScript errors during the build
  },
};

export default nextConfig;
