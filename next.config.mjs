/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Optimize module resolution and compilation
  modularizeImports: {
    // Ensure framer-motion is tree-shaken properly
    'framer-motion': {
      transform: 'framer-motion/{{member}}',
      skipDefaultConversion: true,
    },
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Experimental optimizations
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ['framer-motion'],
  },
};

export default nextConfig;
