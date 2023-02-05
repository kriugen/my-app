/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

import { Amplify, Auth } from 'aws-amplify';

import awsConfig from '../../src/aws-exports';
Amplify.configure({ ...awsConfig, ssr:true });

Cypress.Commands.add('loginByCognitoApi', (username: string, password: string) => {
  const log = Cypress.log({
    displayName: 'COGNITO LOGIN',
    message: [`🔐 Authenticating | ${username} ${password}`],
    // @ts-ignore
    autoEnd: false,
  })

  log.snapshot('before')

  const signIn = Auth.signIn({ username, password })

  cy.wrap(signIn, { log: false }).then((cognitoResponse: any) => {
    const keyPrefixWithUsername = `${cognitoResponse.keyPrefix}.${cognitoResponse.username}`

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.idToken`,
      cognitoResponse.signInUserSession.idToken.jwtToken
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.accessToken`,
      cognitoResponse.signInUserSession.accessToken.jwtToken
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.refreshToken`,
      cognitoResponse.signInUserSession.refreshToken.token
    )

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.clockDrift`,
      cognitoResponse.signInUserSession.clockDrift
    )

    window.localStorage.setItem(
      `${cognitoResponse.keyPrefix}.LastAuthUser`,
      cognitoResponse.username
    )

    window.localStorage.setItem('amplify-authenticator-authState', 'signedIn')
    log.snapshot('after')
    log.end()
  });
});

Cypress.Commands.add('getBySel', (selector) => { 
  cy.get(`[data-test=${selector}]`);
});

declare global {
  namespace Cypress {
    interface Chainable {
      getBySel(selector: string): Chainable<null>;
      loginByCognitoApi(username: string, password: string): Chainable<null>;
    }
  }
}

export {}