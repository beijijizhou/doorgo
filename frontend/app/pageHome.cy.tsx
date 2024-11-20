import React from 'react'
import Home from './page'

describe('<Home />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Home />)
    cy.get('input[name="searchBox"]').type('bmcc');
    // console.log(cy.get('.suggestions').first())
    cy.get('.suggestions').first().then((element) => {
      console.log(element.text()); // Logs the text inside the element
    });
    
    // .trigger('mouseover').click();




  })
})