describe('Add to Cart Test', () => {
  before(() => {
    // Visit the page where BookTile component is rendered
    cy.visit('/shop'); // Replace with the actual route
  });

  it('should add a book to the cart, clear the cart, close the cart, and add random books again', () => {
    // Add the first book to the cart
    cy.get('.book-tile').first().within(() => {
      cy.get('.add-to-cart-button').should('exist').click();

      // Verify that the cart count increases
      cy.get('.cart-count').should('exist').and('contain', '1');
    });

    // Open the cart overlay
    cy.get('.cart-button').click(); // Replace with the actual selector for the cart button

    // Verify the cart overlay is visible
    cy.get('.cart-overlay').should('be.visible');

    // Clear the cart
    cy.get('.clear-cart-button').should('exist').and('be.visible').click();

    // Close the cart overlay
    cy.get('.close-button').should('exist').and('be.visible').click();

    // Add more random books to the cart
    cy.get('.book-tile').each(($el, index, $list) => {
      if (index < 3) { // Add first 3 books as random books
        cy.wrap($el).within(() => {
          cy.get('.add-to-cart-button').should('exist').click();
        });
      }
    });
  });
});
