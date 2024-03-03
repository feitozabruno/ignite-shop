/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    // domains: ["files.stripe.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        port: "",
        pathname: "/links/**",
      },
    ],
  },
};

export default nextConfig;
