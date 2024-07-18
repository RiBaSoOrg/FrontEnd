// cypress/integration/welcome_screen_interaction_spec.ts

describe('WelcomeScreen  Test', () => {
    beforeEach(() => {
        // Assuming user is already authenticated and on the welcome page
        cy.visit('/welcome');
    });

    it('should display all category buttons', () => {
        cy.contains('Shortstories').should('exist');
        cy.contains('All Books').should('exist');
        cy.contains('Novels').should('exist');
    });

        // Verify redirection to the login page
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
