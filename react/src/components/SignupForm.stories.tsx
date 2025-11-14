import type { Meta, StoryObj } from "@storybook/react-vite";

import { SignupForm } from "./SignupForm";

const meta = {
  component: SignupForm,
  decorators: [
    (Story) => (
      <div className="bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="w-full max-w-sm">
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof SignupForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
