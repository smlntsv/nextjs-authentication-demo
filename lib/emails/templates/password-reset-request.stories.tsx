import type { Meta, StoryObj } from '@storybook/react'
import { PasswordResetRequest } from '@/lib/emails/templates/password-reset-request'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export default {
  title: 'Emails/Password Reset Request',
  component: PasswordResetRequest,
} satisfies Meta<typeof PasswordResetRequest>

type Story = StoryObj<typeof PasswordResetRequest>

export const Default: Story = {
  args: {
    projectName: process.env.PROJECT_NAME,
    userEmail: 'test@test.com',
    setNewPasswordUrl: '#',
  },
  render: (props) => {
    const html = renderToStaticMarkup(createElement(PasswordResetRequest, props))

    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <iframe width="100%" height="100%" srcDoc={html} style={{ border: 'none' }} />
      </div>
    )
  },
}
