const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const app = require("../app");

const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("test blogs api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("verify unique identifier is id", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });

  test("valid post can be added", async () => {
    const newPost = {
      title: "Test",
      author: "Bob",
      url: "https://example.org",
      likes: 0,
    };
    await api
      .post("/api/blogs")
      .send(newPost)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await helper.blogsInDb();
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogsAfter[blogsAfter.length - 1].title).toBe("Test");
  });

  test("likes defaults to 0", async () => {
    const newPost = {
      title: "Testing",
      author: "Bob",
      url: "https://example.org",
    };
    const { body } = await api.post("/api/blogs").send(newPost);
    expect(body.likes).toBe(0);
  });

  test("fails with status code 400 if title and url are missing", async () => {
    const newPost = {
      author: "Martin",
    };
    await api.post("/api/blogs").send(newPost).expect(400);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test("blogs can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((r) => r.title);
    expect(contents).not.toContain(blogToDelete.title);
  });

  test("blogs can be updated", async () => {
    const initialBlogs = await helper.blogsInDb();
    const blogToUpdate = initialBlogs[0];
    const { body } = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: blogToUpdate.likes + 1 })
      .expect(200);
    expect(body.likes).toBe(blogToUpdate.likes + 1);
  });
});

describe("test users api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("hemlig", 10);
    const user = new User({ username: "pelle", name: "Pelle", passwordHash });
    await user.save();
  });

  test("can add new user with fresh username", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = {
      username: "kalle98",
      name: "Kalle",
      password: "hunter2",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((user) => user.username);
    expect(usernames).toContain(newUser.username);
  });

  test("fails to add user if username or password is missing", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = { username: "putte" };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("is required");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("fails to add user if username not unique", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = { username: "pelle", password: "password" };
    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toBe("username must be unique");
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });

  test("fails to add user if username or password is too short", async () => {
    const usersAtStart = await helper.usersInDb();
    const newUser = { username: "aa", password: "bb" };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "is shorter than the minimum allowed length"
    );
    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
