const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");
const api = supertest(app);

describe("test blogs api", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    for (const blog of helper.initialBlogs) {
      let blogObject = new Blog(blog);
      await blogObject.save();
    }
  });

  describe("fetching all blog posts", () => {
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
  });

  describe("adding a new blog post", () => {
    test("post successfully creates new blog post", async () => {
      const newPost = {
        title: "New blogpost",
        author: "Kim",
        url: "https://youtube.com",
        likes: 22,
      };

      await api
        .post("/api/blogs")
        .send(newPost)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
    });

    test("likes defaults to 0 when missing from request", async () => {
      const newPost = {
        title: "Hello",
        author: "Svakar",
        url: "https://facebook.com",
      };

      const { body } = await api.post("/api/blogs").send(newPost).expect(201);
      expect(body.likes).toEqual(0);
    });

    test("fails if title and url are missing", async () => {
      const newPost = {
        author: "Martin",
      };
      await api.post("/api/blogs").send(newPost).expect(400);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });
});

describe("test users api", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "username", password: "password" });
    await user.save();
  });

  describe("creating a new user", () => {
    test("succeeds with fresh username", async () => {
      const usersAtStart = await helper.usersInDb();

      const newUser = {
        username: "Pelle98",
        name: "Pelle",
        password: "hemlig",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

      const usernames = usersAtEnd.map((u) => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test("fails if username or password is missing", async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = { username: "pelle" };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("is required");
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toBe(usersAtStart.length);
    });

    test("fails if username not unique", async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = { username: "username", password: "password" };

      const result = await api
        .post("/api/users")
        .send(newUser)
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(result.body.error).toContain("`username` to be unique");
      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd.length).toBe(usersAtStart.length);
    });

    test("fails if username or password is too short", async () => {
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
});

afterAll(() => {
  mongoose.connection.close();
});
