import "cypress-localstorage-commands";

Cypress.Commands.add("loginWithGoogle", () => {
  cy.visit("/login"); // Replace with your actual login page
  cy.get(".google-login-button").click();
  
  // Mock Google OAuth response and store JWT
  cy.intercept("POST", "/auth/google", {
    statusCode: 200,
    body: { token: "mock-jwt-token" },
  }).as("googleAuth");

  cy.wait("@googleAuth").then((interception) => {
    cy.setLocalStorage("token", interception.response.body.token);
  });

  cy.reload(); // Reload to apply authentication
});
