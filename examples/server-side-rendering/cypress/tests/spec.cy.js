describe('template spec', () => {
  it('passes with simple', () => {
    cy.visit('/?entrypoint=simple', {
    })
    cy.window().then((win) => {
      cy.spy(win, 'loadableEvents').as('spyloadableEvents')
    })
  

    cy.get('@spyloadableEvents')
      .should('be.calledWith', Cypress.sinon.match({ type: 'loadSync', chunkName: 'letters-A' }));
  })
  it('passes with props', () => {
    cy.visit('/?entrypoint=props', {
    })
    cy.window().then((win) => {
      cy.spy(win, 'loadableEvents').as('spyloadableEvents')
    })
  

    cy.get('@spyloadableEvents')
      .should('be.calledWith', Cypress.sinon.match({ type: 'loadSync', chunkName: 'letters-A' }))
      .should('be.calledWith', Cypress.sinon.match({ type: 'loadSync', chunkName: 'letters-F' }));
  })
  it('passes with ssrfalse', () => {
    cy.visit('/?entrypoint=ssrfalse', {
    })
    cy.window().then((win) => {
      cy.spy(win, 'loadableEvents').as('spyloadableEvents')
    })
  

    cy.get('@spyloadableEvents')
    .should('be.calledWith', Cypress.sinon.match({ type: 'startAsyncLoad', chunkName: 'letters-E-param' }))
      .should('be.calledWith', Cypress.sinon.match({ type: 'successAsyncLoad', chunkName: 'letters-E-param' }))
  })
})