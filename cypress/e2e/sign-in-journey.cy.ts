/// <reference types="cypress" />

const scenarios = [
  {
    description: 'Java Script Enabled',
    setup: () => {
      cy.visit('/auth/sign-in')
    },
  },
  {
    description: 'Java Script Disabled',
    setup: () => {
      cy.visit('/auth/sign-in', { javaScriptEnabled: false })
    },
  },
]

describe('Sign In Journey', () => {
  const createdUserEmails: string[] = []

  const createUniqueUser = () => {
    const timestamp = Date.now()

    const email = `user_${timestamp}@test-email1234123413.com`
    const password = 'Password-123123'

    cy.task('db:create:user', { email, password })

    createdUserEmails.push(email)

    return { email, password }
  }

  after(() => {
    createdUserEmails.forEach((email) => cy.task('db:delete:user', email))
  })

  scenarios.forEach(({ description, setup }) => {
    context(description, () => {
      beforeEach(setup)

      it('should render sign-in page', () => {
        cy.get('h1').contains('Log in to your account')
      })

      // Form Submission with Empty Fields
      it('should display errors when submitting empty form fields', () => {
        clickSubmitButton()

        assertEmailErrorMessage('Email is required')
        assertPasswordErrorMessage('Password is required')
      })

      // Invalid Email Format
      it('should display an error for invalid email format', () => {
        ;['user@domain', 'domain.com'].forEach((invalidEmail) => {
          fillEmailField(invalidEmail)

          clickSubmitButton()

          assertEmailErrorMessage('Invalid email')
        })
      })

      // Password Field Empty
      it('should display an error when password field is empty', () => {
        fillEmailField('test@test.com')

        clickSubmitButton()

        assertPasswordErrorMessage('Password is required')
      })

      // Email Field Empty
      it('should display an error when email field is empty', () => {
        fillPasswordField('AbcDeF123.')

        clickSubmitButton()

        assertEmailErrorMessage('Email is required')
      })

      // Incorrect Email/Password Combination
      it('should display an error for incorrect email/password combination', () => {
        // attemptSignIn(userEmail, userPassword + 'wrong')

        const { email, password } = createUniqueUser()

        attemptSignIn(email, password + 'wrong')

        assertPasswordErrorMessage('Wrong password')
      })

      // Non-Existent Account
      it('should display an error for non-existent account', () => {
        attemptSignIn('account-not-exists@not-existed.zone', 'Password-123')

        assertEmailErrorMessage('Email not found')
      })

      // Successful Sign-In
      it('should redirect to dashboard on successful sign-in', () => {
        const { email, password } = createUniqueUser()
        attemptSignIn(email, password)

        ensureOnDashboard()
      })

      // Maximum Input Length
      it('should handle inputs exceeding maximum length', () => {
        const email = 'a'.repeat(512) + 'test@test.com'
        const password = 'Password-123' + 'a'.repeat(512)

        attemptSignIn(email, password)

        assertEmailErrorMessage('Email must be at most 256 characters')
        assertPasswordErrorMessage('Password must be at most 32 characters')
      })

      // Whitespace Handling
      it('should trim whitespace from email and password fields', () => {
        const { email, password } = createUniqueUser()

        attemptSignIn(`   ${email}   `, password)

        ensureOnDashboard()
      })

      // Email Case Sensitivity
      it('should treat email as case-insensitive', () => {
        const { email, password } = createUniqueUser()

        attemptSignIn(randomizeStringCase(email), password)

        ensureOnDashboard()
      })

      // Password Case Sensitivity
      it('should treat password as case-sensitive', () => {
        const { email, password } = createUniqueUser()
        createdUserEmails.push(email)

        attemptSignIn(email, randomizeStringCase(password))

        assertPasswordErrorMessage('Wrong password')
      })

      // Require Upper Case Characters in Password
      it('should not accept passwords without upper case characters', () => {
        const { email } = createUniqueUser()
        attemptSignIn(email, 'bbbbbbbbb123')

        assertPasswordErrorMessage('Password must contain at least one uppercase letter')
      })

      // Require Numbers in Password
      it('should not accept passwords without numbers', () => {
        const { email } = createUniqueUser()

        attemptSignIn(email, 'Abbbbbbbbb-')

        assertPasswordErrorMessage('Password must contain at least one number')
      })

      // Require Special Characters in Password
      it('should not accept passwords without special characters', () => {
        const { email } = createUniqueUser()

        attemptSignIn(email, 'Abbbbbbbbb123')

        assertPasswordErrorMessage('Password must contain at least one special character')
      })

      // Rate Limiting
      it('should enforce rate limiting on multiple failed sign-in attempts', () => {
        const { email, password } = createUniqueUser()

        attemptSignIn(email, password + 'wrong')

        cy.get('body').then(($form) => {
          if ($form.find('[data-testid="auth-form-rate-limiter-message"').length) {
            cy.getByDataId('auth-form-rate-limiter-message')
              .invoke('text')
              .then((text) => {
                const match = text.match(/Please wait (\d+) seconds/)
                if (match && match[1]) {
                  const seconds = parseInt(match[1])
                  cy.wait((seconds + 5) * 1000)

                  attemptSignIn(email, password + 'wrong')
                }
              })
          }
        })

        attemptSignIn(email, password + 'wrong')
        assertPasswordErrorMessage('Wrong password')

        attemptSignIn(email, password + 'wrong')
        cy.getByDataId('auth-form-rate-limiter-message').contains(
          /Too many attempts. Please wait \d+ seconds./
        )
      })
    })
  })
})

function attemptSignIn(email: string, password: string) {
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

function randomizeStringCase(email: string): string {
  return email
    .split('')
    .map((char) => (Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase()))
    .join('')
}
