/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
  stories: ['./stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  staticDirs: ["../public"],
};
export default config;
