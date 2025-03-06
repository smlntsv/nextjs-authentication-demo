import type { Meta, StoryObj } from '@storybook/react'
import { PasswordResetSuccess } from '@/lib/emails/templates/password-reset-success'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export default {
  title: 'Emails/Password Reset Success',
  component: PasswordResetSuccess,
} satisfies Meta<typeof PasswordResetSuccess>

type Story = StoryObj<typeof PasswordResetSuccess>

export const Default: Story = {
  args: {
    projectName: process.env.PROJECT_NAME,
    userEmail: 'test@test.com',
    signInUrl: '#',
  },
  render: (props) => {
    const html = renderToStaticMarkup(createElement(PasswordResetSuccess, props))

    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <iframe width="100%" height="100%" srcDoc={html} style={{ border: 'none' }} />
      </div>
    )
  },
}
