const testUser = {
  username: "pelle",
  password: "hunter2",
  name: "Pelle",
};

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", testUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Log in");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("Succeeds with correct credentials", function () {
      cy.get(".username").type(testUser.username);
      cy.get(".password").type(testUser.password);
      cy.get(".login-button").click();
      cy.contains(`${testUser.name} logged in`);
    });

    it("Fails with wrong credentials", function () {
      cy.get(".username").type("username");
      cy.get(".password").type("password");
      cy.get(".login-button").click();
      cy.contains("Wrong username or password");
      // Check that notification is red
      cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get(".username").type(testUser.username);
      cy.get(".password").type(testUser.password);
      cy.get(".login-button").click();
    });

    it("A blog can be created", function () {
      cy.contains("New blog").click();
      cy.get(".titleInput").type("Test blog");
      cy.get(".authorInput").type("Pelle");
      cy.get(".urlInput").type("http://pelle.com");
      cy.get(".create-button").click();
      cy.contains('Added new blog "Test blog" by Pelle');
      cy.contains("Test blog Pelle");
    });
  });
});
