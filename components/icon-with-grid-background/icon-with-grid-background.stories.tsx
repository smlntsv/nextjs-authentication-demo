import { Meta, StoryObj } from '@storybook/react'
import { IconWithGridBackground } from '@/components/icon-with-grid-background/icon-with-grid-background'
import { IconUser } from '@/components/icons/icon-user'
import { Container } from '@/components/ui/container'

export default {
  title: 'IconWithGridBackground',
  component: IconWithGridBackground,
  argTypes: {
    icon: {
      description: 'Icon component',
    },
  },
} satisfies Meta<typeof IconWithGridBackground>

type Story = StoryObj<typeof IconWithGridBackground>

export const Default: Story = {
  args: {
    icon: <IconUser />,
  },
  render: () => {
    return (
      <Container centered>
        <IconWithGridBackground icon={<IconUser />} />
      </Container>
    )
  },
}
