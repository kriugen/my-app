describe('SignUp', () => {
  it('displays alert if existing user tries to sign up', () => {
    cy.visit('/register');
    cy.getBySel('username').type('test1');
    cy.getBySel('password').type('1%8Se123');
    cy.getBySel('email').type('test@gmail.com');

    cy.getBySel('register-button').click();

    cy.getBySel('error-alert').should('contain', 'User already exists')
    cy.location('pathname').should('eq', '/register');
  });

  //TODO check alert if existing user tries to sign up
})

export {}