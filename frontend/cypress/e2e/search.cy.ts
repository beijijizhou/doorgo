/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useStore from "@/app/store";

function testSearchInput(value: string): void {
  // console.log(cy.get('input[placeholder="Search destination"]'))
  cy.get('input[name="searchBox"]')
    .type(value)
    .should('have.value', value);
}


function testSuggestions(predictions: { description: string }[]): void {
  predictions.forEach((place, index) => {
    cy.get('.suggestions')
      .find('p')
      .eq(index)
      .should('contain.text', place.description);
  });
}

function testSuggestionHoverAndClick(index: number, placeDescription: string): void {
  cy.get('.suggestions')
    .find('p')
    .eq(index)
    .trigger('mouseenter')
    .should('have.class', 'bg-blue-500')
    .and('have.class', 'text-white')
    .click();

  cy.get('input[placeholder="Search destination"]').should('have.value', placeDescription);
}


function testButtonHoverAndClick(): void {
  const buttonSelector = 'button'; // Replace with a more specific selector if necessary
  
  cy.get(buttonSelector)
    .trigger('mouseenter')
    .should('have.css', 'background-color', 'rgb(41, 128, 185)') // Darker blue
    .trigger('mouseleave')
    .should('have.css', 'background-color', 'rgb(93, 173, 226)') // Lighter blue
    .click();

  // Add assertions for the button's click behavior (e.g., triggered API calls, navigation)
}

describe('Search Component Tests', () => {
  beforeEach(() => {
    // Replace with the actual URL where the component is hosted
    cy.visit('http://localhost:3000/');
  });

  it('should handle input typing', () => {
    testSearchInput('bmcc');
  });

  it('should render suggestions', () => {
    const predictions = [
      { description: 'Place 1' },
      { description: 'Place 2' },
    ];
    cy.window().then((win) => {
      (win as any).predictions = predictions; // Mock predictions in application state
    });
    testSuggestions(predictions);
  });

  it('should handle hover and click on suggestions', () => {
    const predictions = [
      { description: 'Place 1' },
      { description: 'Place 2' },
    ];
    cy.window().then((win) => {
      (win as any).predictions = predictions; // Mock predictions
    });

    testSuggestionHoverAndClick(0, 'Place 1');
  });

  it('should handle button hover and click', () => {
    testButtonHoverAndClick();
  });
});

