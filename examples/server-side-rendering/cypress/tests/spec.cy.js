
const spy = () => {
  cy.window().then((win) => {
    cy.spy(win, 'loadableEvents').as('spyloadableEvents')
  })
}

const shouldObserve = (event) => {
  cy.get('@spyloadableEvents')
    .should('be.calledWith', Cypress.sinon.match(event))
}

describe('test entrypoints', () => {
  it('passes with simple', () => {
    cy.visit('/?entrypoint=simple', {})

    spy()

    shouldObserve({ type: 'loadSync', chunkName: 'letters-A' })
  })
  it('passes with props', () => {
    cy.visit('/?entrypoint=props', {})

    spy()

    shouldObserve({ type: 'loadSync', chunkName: 'letters-A' })
    shouldObserve({ type: 'loadSync', chunkName: 'letters-F' })
  })
  it('passes with ssrfalse', () => {
    cy.visit('/?entrypoint=ssrfalse', {})

    spy()
  
    shouldObserve({ type: 'startAsyncLoad', chunkName: 'letters-E-param' })
    shouldObserve({ type: 'successAsyncLoad', chunkName: 'letters-E-param' })
  })
})