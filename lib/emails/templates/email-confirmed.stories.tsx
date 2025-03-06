import type { Meta, StoryObj } from '@storybook/react'
import { EmailConfirmed } from '@/lib/emails/templates/email-confirmed'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

export default {
  title: 'Emails/Email Confirmed',
  component: EmailConfirmed,
} satisfies Meta<typeof EmailConfirmed>

type Story = StoryObj<typeof EmailConfirmed>

export const Default: Story = {
  args: {
    projectName: process.env.PROJECT_NAME,
    userEmail: 'test@test.com',
    signInUrl: '#',
  },
  render: (props) => {
    const html = renderToStaticMarkup(createElement(EmailConfirmed, props))

    return (
      <div style={{ height: '100vh', width: '100vw' }}>
        <iframe width="100%" height="100%" srcDoc={html} style={{ border: 'none' }} />
      </div>
    )
  },
}
