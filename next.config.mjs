/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jsinternational.store",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
