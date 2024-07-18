describe('Add to Cart and Purchase Test', () => {
    before(() => {
        // Visit the page where BookTile component is rendered
        cy.visit('/shop'); // Replace with the actual route
    });

    it('should add a book to the cart, clear the cart, close the cart, add random books again, and proceed to buy', () => {
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

        // Open the cart overlay again
        cy.get('.cart-button').click();

        // Verify the cart overlay is visible
        cy.get('.cart-overlay').should('be.visible');

        // Click the buy button
        cy.get('.buy-button').should('exist').and('be.visible').click();

        // Verify that the navigation to the order page happens
        cy.url().should('include', '/order');

        // Fill in shipping information
        cy.get('input[name="firstname"]').type('John');
        cy.get('input[name="lastname"]').type('Doe');
        cy.get('input[name="street"]').type('123 Main St');
        cy.get('input[name="houseNumber"]').type('Apt 4B');
        cy.get('input[name="postalCode"]').type('12345');
        cy.get('input[name="state"]').type('CA');
        cy.get('input[name="city"]').type('Los Angeles');

        // Fill in payment information
        cy.get('input[name="cardNumber"]').type('4111111111111111');
        cy.get('input[name="expiryDate"]').type('12/25');
        cy.get('input[name="cvv"]').type('123');

        // Submit the order
        cy.get('.confirm-button', { timeout: 10000 }).should('exist').and('be.visible').click();

    });
});
