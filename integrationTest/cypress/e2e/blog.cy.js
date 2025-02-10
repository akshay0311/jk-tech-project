describe("Blog Post Application", () => {   
    beforeEach("Bypasses Google login and accesses dashboard", () => {
        cy.visit("http://localhost:3001/");
        cy.setLocalStorage("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoidGVzdHVzZXJAZ21haWwuY29tIiwiaWF0IjoxNzM5MTY4NjM1LCJleHAiOjE3MzkxNzIyMzV9.K-WJ3nel60xoZQEj5WkXbTb5EO7zbP5aw38l7AyjI1Y");
        cy.visit("http://localhost:3001/dashboard");
        cy.contains("Blog Post Application").should("be.visible");
    }); 

    it("Card is visible", () => {
      cy.contains("Blog Post Application").should("be.visible");
    })

    it("Delete a post", () => {
      cy.get('body').then(($body) => {
        if ($body.find('button:contains("Delete")').length > 0) {
          cy.contains("Delete").then(($el) => {
            if ($el.is(':visible')) {
              cy.wrap($el).click();
            }
          });
        }
      });      
      cy.wait(200)
    })

    it("Add a post", () => {
      cy.contains("Add Post").click();
      cy.get('input[name="title"]').type('My New Title');
      cy.get('textarea[name="content"]').type('My New Content Body');
      cy.contains("Add").click();
      cy.wait(2000);
    })
});
  