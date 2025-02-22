declare namespace Cypress {
  interface Chainable {
    visit(url: string, options?: Partial<CustomVisitOptions>): Chainable<Window>
    getByDataId<E extends Node = HTMLElement>(dataTestIdAttribute: string): Chainable<JQuery<E>>
    goOffline(): void
    goOnline(): void
    // https://github.com/cypress-io/cypress/blob/develop/packages/driver/src/cypress/state.ts
    state: {
      (k: 'window', v?: Window): Window
      // ...
    }
  }
}

interface CustomVisitOptions extends Cypress.VisitOptions {
  javaScriptEnabled: boolean
}
