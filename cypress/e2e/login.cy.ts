describe('Login', () => {
  it.only('clicks Login button and checks login page is loaded', () => {
    cy.visit('/');
    cy.getBySel('avatar').click();
    cy.getBySel('login').click();
    cy.location('pathname').should('eq', '/login');
  });

  it('login', () => {
    cy.visit('/login');
    cy.getBySel('username').type('test1');
    cy.getBySel('password').type('1%8Se123');
    cy.getBySel('login-button').click();

    cy.getBySel('appbar-open-settings').should('contain', 'test1');
  });

  it('tries to login in non existing user', () => {
    cy.visit('/login');
    cy.getBySel('username').type('test-non-existing');
    cy.getBySel('password').type('1%8Se123');
    cy.getBySel('login-button').click();

    cy.getBySel('error-alert').should('contain', 'User does not exist');
  });

  // it('signs in through api', () => {
  //   cy.loginByCognitoApi('test1', '1%8Se123');
  // });
});

export {}
