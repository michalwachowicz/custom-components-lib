import type { Config } from "jest";

const config: Config = {
  roots: ["<rootDir>/src"],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(webp|jpg|png|svg)$": "identity-obj-proxy",
    "\\.(css|scss)$": "<rootDir>/tests/identityObjectProxy.ts",
    "^@/Assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@/Components/(.*)$": "<rootDir>/src/components/$1",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};

export default config;
