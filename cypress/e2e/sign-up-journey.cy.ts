/// <reference types="cypress" />

import {
  testBasicValidation,
  testFormSubmissionWithNoInternetConnection,
} from '@/cypress/e2e/auth-form-tests'
import {
  assertEmailErrorMessage,
  attemptAuthentication,
  createdUserEmails,
  createUniqueUser,
  ensureOnDashboard,
  waitForAuth,
} from '@/cypress/e2e/auth-form-utils'

const signUpScenarios = [
  {
    description: 'Java Script Enabled',
    visit: (url: string) => {
      cy.visit(url)
    },
    visitSignUp: () => {
      cy.visit('/auth/sign-up')
    },
  },
  {
    description: 'Java Script Disabled',
    visit: (url: string) => {
      cy.visit(url, { javaScriptEnabled: false })
    },
    visitSignUp: () => {
      cy.visit('/auth/sign-up', { javaScriptEnabled: false })
    },
  },
]

// TODO: should trim whitespace from email field
// should treat email as case-insensitive

describe('Sign Up Journey', () => {
  after(() => {
    createdUserEmails.forEach((email) => cy.task('db:delete:user', email))
  })

  testFormSubmissionWithNoInternetConnection('/auth/sign-up')

  signUpScenarios.forEach(({ description, visitSignUp, visit }) => {
    context(description, () => {
      beforeEach(visitSignUp)

      it('should render sign-up page', () => {
        cy.get('h1').contains('Create an account')
      })

      testBasicValidation()

      // Already existed account
      it('should display an error for already existed account', () => {
        const { email, password } = createUniqueUser()

        attemptAuthentication(email, password)

        assertEmailErrorMessage('Email already in use')
      })

      // Successful Sign Up
      context('Successful Sign Up', () => {
        const email = `${crypto.randomUUID()}@test.com`
        const password = 'Password-123123'

        before(visitSignUp)

        after(() => {
          cy.task('db:delete:user', email)
        })

        it('should redirect to confirmation awaiting page after sign-up', () => {
          waitForAuth(() => attemptAuthentication(email, password))

          cy.location('pathname').should('equal', '/auth/sign-up/confirmation-awaiting')
          cy.location('search').should('equal', `?email=${email}`)
        })

        it('should not have user in database before email confirmation', () => {
          cy.task('db:exists:user', email).then((result) => {
            expect(result as boolean).equal(false, 'expected user not to exist in the database')
          })
        })

        it('should receive a confirmation email', () => {
          cy.task('email:getLastUnreadMessageTextByEmail', { email, markAsRead: true }).then(
            (result) => {
              const htmlBody = result as string | null
              expect(htmlBody).not.equal(null)
              expect(htmlBody).contains('Thank you for signing up')
              expect(htmlBody).contains('Confirm Email')
            }
          )
        })

        it('should resend a confirmation email', () => {
          visit(`/auth/sign-up/confirmation-awaiting?email=${email}`)
          cy.getByDataId('resend-confirmation-email-button').should('exist')

          waitForAuth(() => cy.getByDataId('resend-confirmation-email-button').click())

          cy.contains('Confirmation email was sent again.')
        })

        it('should rate limit resends confirmation email clicks', () => {
          visit(`/auth/sign-up/confirmation-awaiting?email=${email}`)

          waitForAuth(() => cy.getByDataId('resend-confirmation-email-button').click())

          cy.contains('Too many attempts. Please wait')
        })

        it('should confirm email and create user in database', () => {
          cy.task('email:getLastUnreadMessageTextByEmail', { email, markAsRead: true })
            .then((result) => {
              const htmlBody = result as string | null
              const matchResult = htmlBody!.match(
                /href="([\w:\/-]+\/auth\/sign-up\/confirm-email\/[\w:\/-]+)"/
              )
              return matchResult![1]
            })
            .then((emailConfirmationUrl) => {
              visit(emailConfirmationUrl)

              cy.task('db:exists:user', email).then((result) => {
                expect(result as boolean).equal(true, 'expected user to exist in the database')
              })

              cy.contains('Your email has been confirmed successfully')
            })
        })

        it('should receive successful registration email', () => {
          cy.task('email:getLastUnreadMessageTextByEmail', { email, markAsRead: false }).then(
            (result) => {
              const htmlBody = result as string | null
              expect(htmlBody).not.equal(null)
              expect(htmlBody).contains('Your registration is now complete.')
              expect(htmlBody).contains('Go to Login Page')
            }
          )
        })

        it('should be able to login from successful registration email', () => {
          cy.task('email:getLastUnreadMessageTextByEmail', { email, markAsRead: true }).then(
            (result) => {
              const htmlBody = result as string | null
              const matchResult = htmlBody!.match(/href="([\w:\/-]+\/auth\/sign-in)"/)
              expect(matchResult).not.equal(null)

              visit(matchResult![1])
              attemptAuthentication(email, password)
              ensureOnDashboard()
            }
          )
        })
      })
    })
  })
})
