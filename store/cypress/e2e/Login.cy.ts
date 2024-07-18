// cypress/integration/login_spec.js

describe('Keycloak Login Test', () => {
    it('should successfully login with Keycloak', () => {
        // Visit the login page
        cy.visit('/');

        // Check if the login button exists and click it
        cy.get('button').contains('Login').should('exist').click();

        // Keycloak login page interaction
        cy.origin('http://localhost:8080', () => {

            // Assuming there are input fields for username and password with the following IDs
            cy.get('#username').type('admin'); // Replace 'your-username' with a valid username
            cy.get('#password').type('admin'); // Replace 'your-password' with a valid password
            cy.get('#kc-login').click(); // Assuming the login button has the ID 'kc-login'
        });

        // Verify that the user is redirected to the welcome page
        cy.url().should('include', '/welcome');

        // Verify that some welcome text or element is visible
        cy.contains('Willkommen').should('be.visible');
    });
});
