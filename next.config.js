/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://agnos.cloud",
    WS_URL: process.env.NODE_ENV === "development" ? "ws://localhost:3000" : "wss://agnos.cloud",
  },
};

module.exports = nextConfig;
