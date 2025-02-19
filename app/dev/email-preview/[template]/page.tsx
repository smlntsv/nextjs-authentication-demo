import { FC } from 'react'
import {
  emailPreviewTemplates,
  isEmailPreviewTemplateKey,
} from '@/lib/emails/templates/email-preview-templates'
import { notFound } from 'next/navigation'
import { renderEmailTemplateToHtml } from '@/lib/emails/render-email-template-to-html'
import Link from 'next/link'

type Props = {
  params: Promise<{ template: string }>
}

const EmailTemplatePreviewPage: FC<Props> = async ({ params }) => {
  const templateKey = (await params).template

  if (!isEmailPreviewTemplateKey(templateKey)) {
    notFound()
  }

  const { template, props } = emailPreviewTemplates[templateKey]
  const html = await renderEmailTemplateToHtml(template as FC<typeof props>, props)

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      <Link href={'/dev/email-preview'}>Back to all emails</Link>
      <iframe width="100%" height="100%" srcDoc={html} />
    </div>
  )
}

export default EmailTemplatePreviewPage
