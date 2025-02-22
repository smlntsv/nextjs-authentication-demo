import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
import path from 'node:path'
import PluginEvents = Cypress.PluginEvents
import {
  createUserRecordIfNotExists,
  deleteUserRecord,
  isUserExists,
} from '@/cypress/support/database-utils'
import { getLastUnreadMessageTextByEmail } from '@/cypress/support/email-utils'

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })

export default defineConfig({
  e2e: {
    setupNodeEvents(on: PluginEvents) {
      on('task', {
        'db:create:user': async ({ email, password }: { email: string; password: string }) =>
          createUserRecordIfNotExists(email, password),
        'db:delete:user': async (email: string) => deleteUserRecord(email),
        'db:exists:user': async (email: string) => isUserExists(email),
        'email:getLastUnreadMessageTextByEmail': async ({
          email,
          markAsRead,
        }: {
          email: string
          markAsRead: boolean
        }) => getLastUnreadMessageTextByEmail(email, markAsRead),
      })
    },
    baseUrl: process.env.FRONTEND_BASE_URL,
    env: {
      ...process.env,
    },
  },
  chromeWebSecurity: false,
})
