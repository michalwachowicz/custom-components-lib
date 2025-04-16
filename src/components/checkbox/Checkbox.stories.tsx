import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/store";

import Checkbox from "./Checkbox";
import Switchable from "../../interfaces/Switchable";

const meta = {
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: Switchable) => {
  const [{ checked }, updateArgs] = useArgs<Switchable>();

  return (
    <Checkbox
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
