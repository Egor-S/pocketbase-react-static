import type { Meta, StoryObj } from "@storybook/react-vite";

import { Navbar } from "./Navbar";

const meta = {
  component: Navbar,
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    queryData: [
      {
        key: ["currentUser"],
        updater: { record: { email: "john.doe@example.com" } },
      },
    ],
  },
};

export const Unauthenticated: Story = {
  parameters: {
    prefetchQuery: [
      {
        queryKey: ["currentUser"],
        queryFn: () => {
          throw new Error("Unauthenticated");
        },
      },
    ],
  },
};
