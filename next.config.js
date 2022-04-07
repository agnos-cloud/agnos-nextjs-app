/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "http://localhost:3000",
  },
};

module.exports = nextConfig;
