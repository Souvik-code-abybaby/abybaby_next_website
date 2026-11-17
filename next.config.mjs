/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   agentFeedback: true,
  // },
  // cacheComponents: true,
  // partialPrefetching: true,

  // Used only when running with --webpack
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm|mov)$/i,
      type: "asset/resource",
    });
    return config;
  },

  // Used only when running with Turbopack
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;