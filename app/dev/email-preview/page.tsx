import { FC } from 'react'
import { emailPreviewTemplates } from '@/lib/emails/templates/email-preview-templates'
import { LinkButton } from '@/components/ui/button'
import { Heading } from '@/components/ui/typography/heading'
import { Container } from '@/components/ui/container'

const EmailPreviewPage: FC = async () => (
  <Container centered>
    <Heading size={'sm'} weight={'semibold'}>
      Email Preview Page
    </Heading>
    <ul style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 5 }}>
      {Object.entries(emailPreviewTemplates).map(([key, { title }]) => (
        <li key={key}>
          <LinkButton size={'xl'} variant={'linkColor'} href={`/dev/email-preview/${key}`}>
            {title}
          </LinkButton>
        </li>
      ))}
    </ul>
  </Container>
)

export default EmailPreviewPage
