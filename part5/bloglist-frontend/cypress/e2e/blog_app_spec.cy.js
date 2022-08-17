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
      cy.login({ username: testUser.username, password: testUser.password });
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

    describe("And some blogs exists", function () {
      beforeEach(function () {
        cy.createBlog({ title: "test", author: "Pelle", url: "some url" });
        cy.createBlog({
          title: "hello",
          author: "Kalle",
          url: "some url",
          likes: 3,
        });
      });

      it("A blog can be liked", function () {
        cy.contains("test Pelle").as("blog");
        cy.get("@blog").contains("View").click();
        cy.get("@blog").contains("Like").click();
        cy.get("@blog").contains("Likes: 1");
      });

      it("A blog can be deleted by its creator", function () {
        cy.contains("test Pelle").as("blog");
        cy.get("@blog").contains("View").click();
        cy.get("@blog").contains("Remove").click();
        cy.contains("Blogpost successfully removed");
      });
    });
  });
});
