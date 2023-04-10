process.env.TZ = "UTC";

module.exports = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/jest/svg-transformer.js",
  },
  preset: "ts-jest",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost",
  },
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/jest/setup.js"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!**/stories/*.{ts,tsx}", "!**/*.stories.{ts,tsx}"],
  coverageDirectory: "coverage",
  moduleWrapper: {
    "\\.(css|styl|less|sass|scss|png|jpg|jpeg|ttf|woff|woff2)$": "identity-obj-proxy",
  },
};
