// cypress/integration/welcome_screen_interaction_spec.ts

describe('Keycloak Login and Welcome Screen Interaction Test', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('/');
    });

    it('should successfully login with Keycloak', () => {
        // Check if the login button exists and click it
        cy.get('button').contains('Login').should('exist').click();

        // Keycloak login page interaction
        cy.origin('http://localhost:8080', () => {
            // Assuming there are input fields for username and password with the following IDs
            cy.get('#username').type('Sopha'); // Replace 'Sopha' with a valid username
            cy.get('#password').type('admin'); // Replace 'admin' with a valid password
            cy.get('#kc-login').click(); // Assuming the login button has the ID 'kc-login'
        });

        // Verify that the user is redirected to the welcome page
        cy.url().should('include', '/welcome');

        // Verify that some welcome text or element is visible
        cy.contains('Willkommen').should('be.visible');
    });

});
