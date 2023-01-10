describe('template spec', () => {
  it('passes', () => {
    cy.visit('/', {
      onBeforeLoad(win) {
        cy.spy(win.console, 'log').as('spyWinConsoleLog');
      },
    })
    cy.get('@spyWinConsoleLog')
      .should('be.calledOnce');
  })
})