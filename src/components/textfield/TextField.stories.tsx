import type { Meta, StoryObj } from "@storybook/react";

import TextField from "./TextField";

const meta = {
  component: TextField,
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Test",
    variant: "standard",
    disabled: false,
    error: false,
  },
};

export const Error: Story = {
  args: {
    label: "Test",
    variant: "standard",
    disabled: false,
    error: "Error message",
  },
};
