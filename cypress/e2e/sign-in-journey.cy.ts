/// <reference types="cypress" />

import {
  assertEmailErrorMessage,
  assertPasswordErrorMessage,
  attemptAuthentication,
  createdUserEmails,
  createUniqueUser,
  ensureOnDashboard,
} from '@/cypress/e2e/auth-form-utils'
import {
  testBasicValidation,
  testFormSubmissionWithNoInternetConnection,
} from '@/cypress/e2e/auth-form-tests'
import { randomizeStringCase } from '@/cypress/support/test-utils'

const signInScenarios = [
  {
    description: 'Java Script Enabled',
    visitSignIn: () => {
      cy.visit('/auth/sign-in')
    },
  },
  {
    description: 'Java Script Disabled',
    visitSignIn: () => {
      cy.visit('/auth/sign-in', { javaScriptEnabled: false })
    },
  },
]

describe('Sign In Journey', () => {
  after(() => {
    createdUserEmails.forEach((email) => cy.task('db:delete:user', email))
  })

  testFormSubmissionWithNoInternetConnection('/auth/sign-in')

  signInScenarios.forEach(({ description, visitSignIn }) => {
    context(description, () => {
      beforeEach(visitSignIn)

      it('should render sign-in page', () => {
        cy.get('h1').contains('Log in to your account')
      })

      testBasicValidation()

      // Incorrect Email/Password Combination
      it('should display an error for incorrect email/password combination', () => {
        const { email, password } = createUniqueUser()

        attemptAuthentication(email, password + 'wrong')

        assertPasswordErrorMessage('Wrong password')
      })

      // Non-Existent Account
      it('should display an error for non-existent account', () => {
        attemptAuthentication('account-not-exists@not-existed.zone', 'Password-123')

        assertEmailErrorMessage('Email not found')
      })

      // Successful Sign-In
      it('should redirect to dashboard on successful sign-in', () => {
        const { email, password } = createUniqueUser()
        attemptAuthentication(email, password)

        ensureOnDashboard()
      })

      // Whitespace Handling
      it('should trim whitespace from email field', () => {
        const { email, password } = createUniqueUser()

        attemptAuthentication(`   ${email}   `, password)

        ensureOnDashboard()
      })

      // Email Case Sensitivity
      it('should treat email as case-insensitive', () => {
        const { email, password } = createUniqueUser()

        attemptAuthentication(randomizeStringCase(email), password)

        ensureOnDashboard()
      })

      // Password Case Sensitivity
      it('should treat password as case-sensitive', () => {
        const { email, password } = createUniqueUser()
        createdUserEmails.push(email)

        attemptAuthentication(email, randomizeStringCase(password))

        assertPasswordErrorMessage('Wrong password')
      })

      // Rate Limiting
      it('should enforce rate limiting on multiple failed sign-in attempts', () => {
        const { email, password } = createUniqueUser()

        attemptAuthentication(email, password + 'wrong')

        cy.get('body').then(($form) => {
          if ($form.find('[data-testid="auth-form-rate-limiter-warning"').length) {
            cy.getByDataId('auth-form-rate-limiter-warning')
              .invoke('text')
              .then((text) => {
                const match = text.match(/Please wait (\d+) seconds/)
                if (match && match[1]) {
                  const seconds = parseInt(match[1])
                  cy.wait((seconds + 5) * 1000)

                  attemptAuthentication(email, password + 'wrong')
                }
              })
          }
        })

        attemptAuthentication(email, password + 'wrong')
        assertPasswordErrorMessage('Wrong password')

        attemptAuthentication(email, password + 'wrong')
        cy.getByDataId('auth-form-rate-limiter-warning').contains(
          /Too many attempts. Please wait \d+ seconds./
        )
      })
    })
  })
})
