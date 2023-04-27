/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://agnos.cloud",
    WS_URL: process.env.NODE_ENV === "development" ? "ws://localhost:3000" : "wss://agnos.cloud",
  },
  images: {
    domains: ["agnos-cdn.s3.amazonaws.com", "lh3.googleusercontent.com"],
    loader: "default",
    remotePatterns: [/^https?:\/\//],
  },
};

module.exports = nextConfig;
