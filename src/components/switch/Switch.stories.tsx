import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/store";

import Switch from "./Switch";
import Switchable from "../../interfaces/Switchable";

const meta = {
  component: Switch,
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: Switchable) => {
  const [{ checked }, updateArgs] = useArgs<Switchable>();

  return (
    <Switch
      {...args}
      checked={checked}
      onChange={() => updateArgs({ ...args, checked: !checked })}
    />
  );
};

export const Default: Story = {
  args: {
    checked: false,
    disabled: false,
    label: "Test",
  },
  render: Template,
};
