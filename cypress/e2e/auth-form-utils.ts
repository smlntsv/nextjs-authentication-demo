/// <reference types="cypress" />

const createdUserEmails: string[] = []

const createUniqueUser = () => {
  const email = `${crypto.randomUUID()}@test-email.com`
  const password = 'Password-123123'

  cy.task('db:create:user', { email, password })

  createdUserEmails.push(email)

  return { email, password }
}

function attemptAuthentication(email: string, password: string) {
  fillEmailField(email)
  fillPasswordField(password)

  clickSubmitButton()
}

function fillEmailField(email: string) {
  cy.getByDataId('auth-form-email').clear()
  cy.getByDataId('auth-form-email').type(email)
}

function fillPasswordField(password: string) {
  cy.getByDataId('auth-form-password').clear()
  cy.getByDataId('auth-form-password').type(password)
}

function clickSubmitButton() {
  cy.getByDataId('auth-form-submit-button').click()
}

function assertEmailErrorMessage(emailErrorMessage: string) {
  cy.getByDataId('auth-form-email-error').contains(emailErrorMessage)
}

function assertPasswordErrorMessage(passwordErrorMessage: string) {
  cy.getByDataId('auth-form-password-error').contains(passwordErrorMessage)
}

function ensureOnDashboard() {
  cy.location('pathname').should('equal', '/dashboard')
}

function waitForAuth(fn: () => void) {
  cy.intercept('POST', '**/auth/**').as('auth')
  fn()
  cy.wait('@auth')
}

export {
  clickSubmitButton,
  assertEmailErrorMessage,
  assertPasswordErrorMessage,
  fillEmailField,
  fillPasswordField,
  attemptAuthentication,
  createdUserEmails,
  createUniqueUser,
  ensureOnDashboard,
  waitForAuth,
}
