import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './container'

// Meta
export default {
  title: 'UI/Container',
  component: Container,
  argTypes: {
    children: {
      description: 'Container content.',
      control: {
        type: 'text',
      },
      table: {
        type: { summary: 'ReactNode' },
        defaultValue: { summary: undefined },
      },
    },
  },
} satisfies Meta<typeof Container>

// Stories
type Story = StoryObj<typeof Container>

export const Default: Story = {
  args: {
    children: 'Container content',
  },
}
