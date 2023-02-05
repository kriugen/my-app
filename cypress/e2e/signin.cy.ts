describe('SignIn', () => {
  it('clicks SignIn button and checks signin page is loaded', () => {
    cy.visit('/');
    cy.getBySel('navbar-signin-button').click();
    cy.location('pathname').should('eq', '/signin');
  });

  it('signs in', () => {
    cy.visit('/signin');
    cy.getBySel('username').type('test1');
    cy.getBySel('password').type('1%8Se123');
    cy.getBySel('signin-button').click();

    cy.getBySel('appbar-open-settings').should('contain', 'test1');
  });

  it('tries to sign in non existing user', () => {
    cy.visit('/signin');
    cy.getBySel('username').type('test-non-existing');
    cy.getBySel('password').type('1%8Se123');
    cy.getBySel('signin-button').click();

    cy.getBySel('error-alert').should('contain', 'User does not exist');
  });

  // it('signs in through api', () => {
  //   cy.loginByCognitoApi('test1', '1%8Se123');
  // });
});

export {}
