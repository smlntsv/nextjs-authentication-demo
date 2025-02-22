import { MailtrapClient } from 'mailtrap'
import { Message } from 'mailtrap/dist/types/api/messages'
import { Inbox } from 'mailtrap/dist/types/api/inboxes'

async function createClient() {
  const token = process.env.MAILTRAP_API_TOKEN ?? ''
  const testInboxId = Number(process.env.MAILTRAP_TEST_INBOX_ID)
  const accountId = Number(process.env.MAILTRAP_ACCOUNT_ID)

  return new MailtrapClient({ token, testInboxId, accountId })
}

async function getLastUnreadMessageTextByEmail(
  email: string,
  markAsRead: boolean = true
): Promise<string | null> {
  const client = await createClient()

  const inboxes = await client.testing.inboxes.getList()
  if (inboxes.length < 1) {
    throw new Error('No inboxes found')
  }

  const inbox: Inbox = inboxes[0]
  const messages: Message[] = await client.testing.messages.get(inbox.id)

  const message = messages.find((message) => message.to_email === email && !message.is_read)
  if (!message) {
    return null
  }

  if (markAsRead) {
    await client.testing.messages.updateMessage(inbox.id, message.id, {
      isRead: true,
    })
  }

  return await client.testing.messages.getMessageHtmlSource(inbox.id, message.id)
}

export { getLastUnreadMessageTextByEmail }
