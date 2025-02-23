import {
  assertEmailErrorMessage,
  assertPasswordErrorMessage,
  attemptAuthentication,
  clickSubmitButton,
  fillEmailField,
  fillPasswordField,
} from '@/cypress/e2e/auth-form-utils'

function testBasicValidation() {
  // Form Submission with Empty Fields
  testEmptyFormSubmission()

  // Invalid Email Format
  testInvalidEmailFormat()

  // Password Field Empty
  testEmptyPasswordField()

  // Email Field Empty
  testEmptyEmailField()

  // Minimum Password Length
  testMinimumPasswordLength()

  // Maximum Input Length
  testMaximumInputLength()

  // Require Lowercase Characters in Password
  testRejectsPasswordWithoutLowercase()

  // Require Uppercase Characters in Password
  testRejectsPasswordWithoutUppercase()

  // Require Numbers in Password
  testRejectsPasswordWithoutNumbers()

  // Require Special Characters in Password
  testRejectsPasswordWithoutSpecialCharacters()
}

function testEmptyFormSubmission() {
  it('should display errors when submitting empty form fields', () => {
    clickSubmitButton()

    assertEmailErrorMessage('Email is required')
    assertPasswordErrorMessage('Password is required')
  })
}

function testInvalidEmailFormat() {
  it('should display an error for invalid email format', () => {
    ;['user@domain', 'domain.com'].forEach((invalidEmail) => {
      fillEmailField(invalidEmail)

      clickSubmitButton()

      assertEmailErrorMessage('Invalid email')
    })
  })
}

function testEmptyPasswordField() {
  it('should display an error when password field is empty', () => {
    fillEmailField('test@test.com')

    clickSubmitButton()

    assertPasswordErrorMessage('Password is required')
  })
}

function testEmptyEmailField() {
  it('should display an error when email field is empty', () => {
    fillPasswordField('AbcDeF123.')

    clickSubmitButton()

    assertEmailErrorMessage('Email is required')
  })
}

function testMinimumPasswordLength() {
  it('should display an error when password length less than 6 characters', () => {
    attemptAuthentication('test@test.com', 'Pa-1')

    assertPasswordErrorMessage('Password must be at least 6 characters')
  })
}

function testMaximumInputLength() {
  it('should handle inputs exceeding maximum length', () => {
    const email = 'a'.repeat(257) + 'test@test.com'
    const password = 'Password-123' + 'a'.repeat(33)

    attemptAuthentication(email, password)

    assertEmailErrorMessage('Email must be at most 256 characters')
    assertPasswordErrorMessage('Password must be at most 32 characters')
  })
}

function testRejectsPasswordWithoutLowercase() {
  it('should not accept passwords without lowercase letters', () => {
    attemptAuthentication('test@test.com', 'BBBBBBBBB123')

    assertPasswordErrorMessage('Password must contain at least one lowercase letter')
  })
}

function testRejectsPasswordWithoutUppercase() {
  it('should not accept passwords without uppercase letters', () => {
    attemptAuthentication('test@test.com', 'bbbbbbbbb123')

    assertPasswordErrorMessage('Password must contain at least one uppercase letter')
  })
}

function testRejectsPasswordWithoutNumbers() {
  it('should not accept passwords without numbers', () => {
    attemptAuthentication('test@test.com', 'Abbbbbbbbb-')

    assertPasswordErrorMessage('Password must contain at least one number')
  })
}

function testRejectsPasswordWithoutSpecialCharacters() {
  it('should not accept passwords without special characters', () => {
    attemptAuthentication('test@test.com', 'Abbbbbbbbb123')

    assertPasswordErrorMessage('Password must contain at least one special character')
  })
}

function testFormSubmissionWithNoInternetConnection(pathname: string) {
  context('Form Submission with No Internet Connection and JavaScript Enabled', () => {
    afterEach(() => cy.goOnline())

    it('should display network error message when there is not internet connection and try again button should return to the form', () => {
      cy.visit(pathname)
      cy.goOffline()

      attemptAuthentication('test@test.com', 'Password-123')
      cy.contains('It looks like there is a problems with Internet connection')

      cy.getByDataId('try-again-button').should('exist')
    })
  })
}

export {
  testEmptyFormSubmission,
  testInvalidEmailFormat,
  testEmptyPasswordField,
  testEmptyEmailField,
  testMaximumInputLength,
  testRejectsPasswordWithoutUppercase,
  testRejectsPasswordWithoutNumbers,
  testRejectsPasswordWithoutSpecialCharacters,
  testBasicValidation,
  testFormSubmissionWithNoInternetConnection,
}
