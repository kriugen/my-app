describe('Post', () => {
  it.only('creates post', () => {
    cy.task('db:teardown');
    cy.task('db:seed');

    cy.loginByCognitoApi(
      Cypress.env('username'), 
      Cypress.env('password')
    );

    cy.visit('/posts/new');
    cy.getBySel('title').type('post 1');
    cy.getBySel('submit-post').click();
  });
});

export {}