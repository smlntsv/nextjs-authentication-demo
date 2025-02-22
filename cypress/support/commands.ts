/// <reference types="cypress" />

Cypress.Commands.overwrite(
  'visit',
  (commandOriginalFn, url, options = { javaScriptEnabled: true }) => {
    const parentDocument: Document = cy.state('window').parent.document

    const iframe: HTMLIFrameElement | null = parentDocument.querySelector('iframe')

    if (!options.javaScriptEnabled) {
      if (Cypress.config('chromeWebSecurity')) {
        throw new TypeError(
          'When you disable script you also have to set `chromeWebSecurity` in your config to `false`'
        )
      }

      iframe?.setAttribute(
        'sandbox',
        'allow-forms allow-same-origin allow-popups allow-top-navigation'
      )
    } else {
      // In case it was added by a visit before, the attribute has to be removed from the iframe
      iframe?.removeAttribute('sandbox')
    }

    return commandOriginalFn(url, options)
  }
)

Cypress.Commands.add('getByDataId', (dataTestIdAttribute: string) => {
  return cy.get(`[data-testid="${dataTestIdAttribute}"]`)
})

Cypress.Commands.add('goOffline', () => {
  console.log('commands go offline')
  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.enable',
  }).then(() => {
    return Cypress.automation('remote:debugger:protocol', {
      command: 'Network.emulateNetworkConditions',
      params: {
        offline: true,
        latency: -1,
        downloadThroughput: -1,
        uploadThroughput: -1,
      },
    })
  })
})

Cypress.Commands.add('goOnline', () => {
  console.log('commands go online')
  Cypress.automation('remote:debugger:protocol', {
    command: 'Network.enable',
  }).then(() => {
    return Cypress.automation('remote:debugger:protocol', {
      command: 'Network.emulateNetworkConditions',
      params: {
        offline: false,
        latency: -1,
        downloadThroughput: -1,
        uploadThroughput: -1,
      },
    })
  })

  // Optionally Network.disable command can be called
})
