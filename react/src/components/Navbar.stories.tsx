import type { Meta, StoryObj } from "@storybook/react-vite";

import { Navbar } from "./Navbar";

const meta = {
  component: Navbar,
  parameters: {
    queryData: [
      {
        key: ["currentUser"],
        updater: { record: { email: "john.doe@example.com" } },
      },
    ],
  },
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
