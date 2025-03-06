import type { Meta, StoryObj } from '@storybook/react'
import { ConfirmEmail } from '@/lib/emails/templates/confirm-email'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export default {
  title: 'Emails/Confirm Email',
  component: ConfirmEmail,
} satisfies Meta<typeof ConfirmEmail>

type Story = StoryObj<typeof ConfirmEmail>

export const Default: Story = {
  args: {
    projectName: process.env.PROJECT_NAME,
    userEmail: 'test@test.com',
    emailConfirmationUrl: '#',
  },
  render: (props) => {
    const html = renderToStaticMarkup(createElement(ConfirmEmail, props))

    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <iframe width="100%" height="100%" srcDoc={html} style={{ border: 'none' }} />
      </div>
    )
  },
}
