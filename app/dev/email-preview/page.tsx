import { FC } from 'react'
import Link from 'next/link'
import { emailPreviewTemplates } from '@/lib/emails/templates/email-preview-templates'

const EmailPreviewPage: FC = async () => (
  <>
    <h1>Email Preview Page</h1>
    <ul>
      {Object.entries(emailPreviewTemplates).map(([key, { title }]) => (
        <li key={key}>
          <Link href={`/dev/email-preview/${key}`}>{title}</Link>
        </li>
      ))}
    </ul>
  </>
)

export default EmailPreviewPage
