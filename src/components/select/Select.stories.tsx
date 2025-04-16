import type { Meta, StoryObj } from "@storybook/react";

import Select from "./Select";

const meta = {
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Test",
    variant: "standard",
    disabled: false,
    error: false,
    options: [
      { value: "1", content: "Test 1" },
      { value: "2", content: "Test 2" },
      { value: "3", content: "Test 3" },
    ],
  },
};

export const Error: Story = {
  args: {
    label: "Test",
    variant: "standard",
    disabled: false,
    error: "Error message",
    options: [
      { value: "1", content: "Test 1" },
      { value: "2", content: "Test 2" },
      { value: "3", content: "Test 3" },
    ],
  },
};
