import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeading, CardText } from './card'
import { IconUser } from '@/components/icons/icon-user'
import { Container } from '@/components/ui/container'

export default {
  title: 'Card',
  component: Card,
} as Meta<typeof Card>

type Story = StoryObj<typeof Card>

export const Success: Story = {
  render: () => (
    <Container centered>
      <Card icon={<IconUser />}>
        <CardHeading>Heading</CardHeading>
        <CardText>Description</CardText>
      </Card>
    </Container>
  ),
}
