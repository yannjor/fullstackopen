const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

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

afterAll(() => {
  mongoose.connection.close();
});
