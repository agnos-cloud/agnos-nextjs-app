/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://agnos.cloud",
    WS_URL: process.env.NODE_ENV === "development" ? "ws://localhost:3000" : "wss://agnos.cloud",
  },
  images: {
    domains: ["agnos-cdn.s3.amazonaws.com"],
    loader: "default",
    // Add the following remotePatterns option
    // to allow external image sources
    // that match the specified regular expressions
    // to be used with next/image.
    // In this case, it matches all HTTP and HTTPS URLs.
    // You can modify this pattern to suit your needs.
    // Note: The remotePatterns option requires Next.js v12.0.0 or higher.
    remotePatterns: [/^https?:\/\//],
  },
};

module.exports = nextConfig;
