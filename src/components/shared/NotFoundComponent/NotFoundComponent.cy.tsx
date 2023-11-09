import NotFoundComponent from './index'

describe('<NotFoundComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NotFoundComponent message="Component not found" />)
  })
})
