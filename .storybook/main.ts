import type { StorybookConfig } from "@storybook/react-webpack5";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    const webpackConfig = await import("../webpack.config.js").then(
      (mod) => mod.default ?? mod
    );

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...(config?.module?.rules || []),
          ...webpackConfig.module.rules,
        ],
      },
    };
  },
};
export default config;
