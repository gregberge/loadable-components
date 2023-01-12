describe('template spec', () => {
  it('passes', () => {
    cy.visit('/', {
    })
    cy.window().then((win) => {
      cy.spy(win.loadableEvents, 'emit' ).as('spyLoadableEmit')
    })
  

    cy.get('@spyLoadableEmit')
      .should('be.calledOnce');
  })
})