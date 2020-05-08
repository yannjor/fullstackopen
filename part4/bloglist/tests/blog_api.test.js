const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
  {
    title: "Hello world",
    author: "Pelle",
    url: "https://google.com",
    likes: 69,
  },
  {
    title: "Another blogpost",
    author: "Kalle",
    url: "https://github.com",
    likes: 420,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
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

afterAll(() => {
  mongoose.connection.close();
});
