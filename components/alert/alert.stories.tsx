import type { Meta, StoryObj } from '@storybook/react'
import { Alert } from '@/components/alert'

export default {
  title: 'Alert',
  component: Alert,
} as Meta<typeof Alert>

type Story = StoryObj<typeof Alert>

export const Success: Story = {
  args: {
    type: 'success',
    text: 'Success alert text',
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    text: 'Warning alert text',
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    text: 'Error alert text',
  },
}
