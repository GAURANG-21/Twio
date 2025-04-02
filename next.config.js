/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      crypto: require.resolve("crypto-browserify"), // Ensures crypto works in the browser
    };
    return config;
  },
  images: {
    domains: ["utfs.io"],
  },
};

module.exports = nextConfig;
