/** @type {import("next").NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-uat.doyouzazu.com",
        port: ""
      },
      {
        protocol: "https",
        hostname: "api.doyouzazu.com",
        port: ""
      },
      {
        protocol: 'https',
        hostname: 'd151e5y2tphsnj.cloudfront.net',
        pathname: '/**', // allow all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**', // allow all paths under this domain
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**', // allow all paths under this domain
      },

      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/**', // allow all paths under this domain
      },
      
    ]
  }
};

export default nextConfig;
