import type { Meta, StoryObj } from '@storybook/react'
import { LinkButton } from '@/components/ui/button'

export default {
  title: 'UI/Button',
  component: LinkButton,
} satisfies Meta<typeof LinkButton>

type Story = StoryObj<typeof LinkButton>

export const DefaultLinkButton: Story = {
  args: {
    href: '#',
    children: 'Link Button',
  },
}
