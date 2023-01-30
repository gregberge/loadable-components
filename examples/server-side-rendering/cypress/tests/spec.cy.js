describe('template spec', () => {
  it('passes', () => {
    cy.visit('/', {
    })
    cy.window().then((win) => {
      cy.spy(win, 'loadableEvents').as('spyloadableEvents')
    })
  

    cy.get('@spyloadableEvents')
      .should('be.calledWith', Cypress.sinon.match({ type: 'successAsyncLoad' }));
  })
})