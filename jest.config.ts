import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  preset: "ts-jest",
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverage: true,
  setupFilesAfterEnv: ["./src/setup-jest.ts"],
};

export default createJestConfig(config);
