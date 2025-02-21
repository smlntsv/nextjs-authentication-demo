import { defineConfig } from 'cypress'
import dotenv from 'dotenv'
import path from 'node:path'

dotenv.config({ path: path.resolve(process.cwd(), '.env.test') })

export default defineConfig({
  e2e: {
    setupNodeEvents() {},
    baseUrl: process.env.FRONTEND_BASE_URL,
    env: {
      ...process.env,
    },
  },
  chromeWebSecurity: false,
})
