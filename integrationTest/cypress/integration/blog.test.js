describe("Blog Post Application", () => {
    beforeEach(() => {
      cy.restoreLocalStorage(); // Restore JWT after each test
    });
  
    afterEach(() => {
      cy.saveLocalStorage(); // Save JWT after each test
    });
  
    it("Should log in using Google OAuth", () => {
      cy.loginWithGoogle();
      cy.visit("/dashboard");
      cy.contains("Welcome").should("be.visible");
    });
  
    it("Should create a new blog post", () => {
      cy.visit("/dashboard");
      cy.get(".new-post-button").click();
      cy.get("input[name='title']").type("Cypress Testing");
      cy.get("textarea[name='content']").type("This is a Cypress test post.");
      cy.get(".submit-post-button").click();
  
      cy.intercept("POST", "/api/posts", {
        statusCode: 201,
        body: {
          id: 1,
          title: "Cypress Testing",
          content: "This is a Cypress test post.",
        },
      }).as("createPost");
  
      cy.wait("@createPost");
      cy.contains("Cypress Testing").should("be.visible");
    });
  
    it("Should display the list of blog posts", () => {
      cy.intercept("GET", "/api/posts", {
        statusCode: 200,
        body: [
          { id: 1, title: "Cypress Testing", content: "Test Content 1" },
          { id: 2, title: "NestJS + Cypress", content: "Test Content 2" },
        ],
      }).as("getPosts");
  
      cy.visit("/dashboard");
      cy.wait("@getPosts");
      cy.contains("Cypress Testing").should("be.visible");
      cy.contains("NestJS + Cypress").should("be.visible");
    });
  
    it("Should edit an existing blog post", () => {
      cy.intercept("PUT", "/api/posts/1", {
        statusCode: 200,
        body: {
          id: 1,
          title: "Updated Title",
          content: "Updated Content",
        },
      }).as("updatePost");
  
      cy.get(".edit-button").first().click();
      cy.get("input[name='title']").clear().type("Updated Title");
      cy.get("textarea[name='content']").clear().type("Updated Content");
      cy.get(".save-button").click();
  
      cy.wait("@updatePost");
      cy.contains("Updated Title").should("be.visible");
    });
  
    it("Should delete a blog post", () => {
      cy.intercept("DELETE", "/api/posts/1", { statusCode: 200 }).as("deletePost");
  
      cy.get(".delete-button").first().click();
      cy.wait("@deletePost");
      cy.contains("Updated Title").should("not.exist");
    });
  });
  