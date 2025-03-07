/// <reference types="cypress" />

import {
  attemptAuthentication,
  createdUserEmails,
  createUniqueUser,
  ensureOnDashboard,
} from '@/cypress/e2e/auth-form-utils'
import { randomizeStringCase } from '@/cypress/support/test-utils'

const passwordResetScenarios = [
  {
    description: 'Java Script Enabled',
    visit: (url: string) => {
      cy.visit(url)
    },
    visitPasswordReset: () => {
      cy.visit('/auth/password-reset')
    },
  },
  {
    description: 'Java Script Disabled',
    visit: (url: string) => {
      cy.visit(url, { javaScriptEnabled: false })
    },
    visitPasswordReset: () => {
      cy.visit('/auth/password-reset', { javaScriptEnabled: false })
    },
  },
]

describe('Password Reset Journey', () => {
  after(() => {
    createdUserEmails.forEach((email) => cy.task('db:delete:user', email))
  })

  passwordResetScenarios.forEach(({ description, visitPasswordReset, visit }) => {
    context(description, () => {
      beforeEach(() => {
        visitPasswordReset()
      })

      // Render Password Reset Page
      it('should render password reset page', () => {
        cy.contains('Forgot Password?')
        cy.getByDataId('email-field').should('exist')
        cy.getByDataId('reset-password-button').should('exist')
      })

      // Form Submission with Empty Email Field
      it('should display error when submitting empty form field', () => {
        clickResetPasswordButton()

        assertEmailErrorMessage('Email is required')
      })

      // Invalid Email Format
      it('should display an error for invalid email format', () => {
        const invalidEmail = 'user@domain'
        attemptPasswordReset(invalidEmail)

        assertEmailErrorMessage('Invalid email')
      })

      // Too Long Email
      it('should handle email exceeding maximum length', () => {
        const tooLongEmail = 'a'.repeat(257) + 'test@test.com'

        attemptPasswordReset(tooLongEmail)

        assertEmailErrorMessage('Email must be at most 256 characters')
      })

      // Non-Existent Account
      it('should display an error for non-existent account', () => {
        attemptPasswordReset('account-not-exists@not-existed.zone')

        assertEmailErrorMessage('Email not found')
      })

      // Whitespace Handling
      it('should trim whitespace from email field', () => {
        const { email } = createUniqueUser()

        attemptPasswordReset(`   ${email}   `, true)

        ensureOnConfirmationPage(email)
      })

      // Email Case Sensitivity
      it('should treat email as case-insensitive', () => {
        const { email } = createUniqueUser()

        attemptPasswordReset(randomizeStringCase(email), true)

        ensureOnConfirmationPage(email)
        cy.contains(email)
      })

      // Rate Limiting on Password Reset Page
      it('should enforce rate limiting on multiple password reset requests (password reset page)', () => {
        const { email } = createUniqueUser()

        attemptPasswordReset(email, true)
        ensureOnConfirmationPage(email)
        cy.go('back')

        attemptPasswordReset(email)
        ensureRateLimited()
      })

      // Rate Limiting on Confirmation Page
      it('should enforce rate limiting on multiple password reset requests (confirmation page)', () => {
        const { email } = createUniqueUser()

        attemptPasswordReset(email, true)
        ensureOnConfirmationPage(email)

        clickResendPasswordResetButton()
        ensureRateLimited()

        cy.wait(60 * 1000)
        clickResendPasswordResetButton()
        cy.contains('Password reset link was sent again.')
      })

      context('Successful Flow', () => {
        let email: string
        let setNewPasswordUrl: string | undefined
        let signInUrl: string | undefined
        const newPassword = 'New-Password-123'

        before(() => {
          const user = createUniqueUser()
          email = user.email
        })

        // Successful Password Reset Request
        it('should redirect to confirmation page', () => {
          attemptPasswordReset(email, true)

          ensureOnConfirmationPage(email)
          ensureResendPasswordResetButtonPresent()
        })

        // Invalid Token Handling
        it('should display an error for invalid or expired token on password reset page', () => {
          visit(`/auth/password-reset/wrong-or-expired-password-reset-token`)
          cy.contains('Invalid or Expired Link')
        })

        // Email Confirmation Link
        it('should receive password reset request email with password reset link', () => {
          cy.task('email:getLastUnreadMessageTextByEmail', { email, markAsRead: true }).then(
            (result) => {
              const htmlBody = result as string | null
              expect(htmlBody).not.equal(null)
              expect(htmlBody).contains('We received a request to reset your password.')
              expect(htmlBody).contains('Set New Password')
              const matchResult = htmlBody!.match(
                /href="([\w:\/-]+\/auth\/password-reset\/[\w:\/-]+)"/
              )
              expect(matchResult).not.equal(null)
              setNewPasswordUrl = matchResult![1]
            }
          )
        })

        it('should render password reset page if token is valid', () => {
          expect(setNewPasswordUrl).not.to.be.an('undefined')
          visit(setNewPasswordUrl!)
          cy.contains('Set New Password')
        })

        // Reject empty password
        it('should display an error on empty password', () => {
          visit(setNewPasswordUrl!)

          attemptSetNewPassword('', setNewPasswordUrl!)

          assertPasswordErrorMessage('Password is required')
        })

        // Reject less than 6 characters
        it('should display an error when password length less than 6 characters', () => {
          visit(setNewPasswordUrl!)

          const tooShortPassword = 'short'
          attemptSetNewPassword(tooShortPassword, setNewPasswordUrl!)

          assertPasswordErrorMessage('Password must be at least 6 characters')
        })

        // Reject more than 32 characters
        it('should display an error when password length more than 32 characters', () => {
          visit(setNewPasswordUrl!)

          const tooLongPassword = 'a'.repeat(33)
          attemptSetNewPassword(tooLongPassword, setNewPasswordUrl!)

          assertPasswordErrorMessage('Password must be at most 32 characters')
        })

        // Reject without uppercase
        it('should not accept passwords without uppercase letters', () => {
          visit(setNewPasswordUrl!)

          const noUppercaseLettersPassword = 'password-123'
          attemptSetNewPassword(noUppercaseLettersPassword, setNewPasswordUrl!)

          assertPasswordErrorMessage('Password must contain at least one uppercase letter')
        })

        // Reject without lowercase
        it('should not accept passwords without lowercase letters', () => {
          visit(setNewPasswordUrl!)

          const noLowercaseLettersPassword = 'PASSWORD-123'
          attemptSetNewPassword(noLowercaseLettersPassword, setNewPasswordUrl!)

          assertPasswordErrorMessage('Password must contain at least one lowercase letter')
        })

        // Reject without number
        it('should not accept passwords without numbers', () => {
          visit(setNewPasswordUrl!)
          const noNumbersPassword = 'Password-'
          attemptSetNewPassword(noNumbersPassword, setNewPasswordUrl!)

          assertPasswordErrorMessage('Password must contain at least one number')
        })

        // Successful Password Reset
        it('should successfully set new password', () => {
          visit(setNewPasswordUrl!)

          attemptSetNewPassword(newPassword, setNewPasswordUrl!, true)

          ensureOnSuccessPage(email)
        })

        it('should receive password has been changed email with go to login page link', () => {
          cy.task('email:getLastUnreadMessageTextByEmail', { email, markAsRead: true }).then(
            (result) => {
              const htmlBody = result as string | null
              expect(htmlBody).not.equal(null)
              expect(htmlBody).contains('Your password has been successfully updated.')
              expect(htmlBody).contains('Go to Login Page')
              const matchResult = htmlBody!.match(/href="([\w:\/-]+\/auth\/sign-in)"/)
              expect(matchResult).not.equal(null)
              signInUrl = matchResult![1]
            }
          )
        })

        // Login with New Password
        it('should be able to login with new password using link from email', () => {
          visit(signInUrl!)

          attemptAuthentication(email, newPassword)

          ensureOnDashboard()
        })
      })
    })
  })
})

function ensureOnSuccessPage(email: string) {
  cy.location('pathname').should('equal', '/auth/password-reset/success')
  cy.location('search').should('equal', `?email=${email}`)
}

function ensureOnConfirmationPage(email: string) {
  cy.location('pathname').should('equal', '/auth/password-reset/confirmation')
  cy.location('search').should('equal', `?email=${email}`)
}

function ensureResendPasswordResetButtonPresent() {
  cy.getByDataId('resend-password-reset-link-button').should('exist')
}

function clickResendPasswordResetButton() {
  cy.intercept('POST', '/auth/password-reset').as('requestPasswordReset')
  cy.getByDataId('resend-password-reset-link-button').click()
  cy.wait('@requestPasswordReset')
}

function ensureRateLimited() {
  cy.contains('Too many attempts. Please wait')
}

function attemptPasswordReset(email: string, wait: boolean = false) {
  cy.getByDataId('email-field').clear()
  cy.getByDataId('email-field').type(email)

  if (wait) {
    cy.intercept('POST', /\/auth\/password-reset/).as('requestPasswordReset')
  }

  clickResetPasswordButton()

  if (wait) {
    cy.wait('@requestPasswordReset')
  }
}

function assertEmailErrorMessage(message: string) {
  cy.getByDataId('email-error').contains(message)
}

// Set New Password Helpers
function attemptSetNewPassword(password: string, url: string, wait: boolean = false) {
  fillPasswordField(password)

  if (wait) {
    cy.intercept('POST', url).as('setNewPasswordRequest')
  }

  clickSetNewPasswordButton()

  if (wait) {
    cy.wait('@setNewPasswordRequest')
  }
}

function fillPasswordField(password: string) {
  cy.getByDataId('password-field').clear()
  if (password.length) cy.getByDataId('password-field').type(password)
}

function clickResetPasswordButton() {
  cy.getByDataId('reset-password-button').click()
}

function clickSetNewPasswordButton() {
  cy.getByDataId('set-new-password-button').click()
}

function assertPasswordErrorMessage(message: string) {
  cy.getByDataId('password-error').contains(message)
}
