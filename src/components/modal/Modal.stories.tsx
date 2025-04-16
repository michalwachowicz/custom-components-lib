import type { Meta, StoryObj } from "@storybook/react";
import { useArgs } from "@storybook/store";

import Modal, { ModalProps } from "./Modal";
import Button from "../button/Button";

const meta = {
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

const Template = (args: ModalProps) => {
  const [, updateArgs] = useArgs<ModalProps>();

  return (
    <div>
      <Button size='large' onClick={() => updateArgs({ ...args, open: true })}>
        Open Modal
      </Button>
      <Modal {...args} onClose={() => updateArgs({ ...args, open: false })} />
    </div>
  );
};

export const Default: Story = {
  args: {
    open: false,
    children: "Hello, world!",
  },
  render: Template,
};
