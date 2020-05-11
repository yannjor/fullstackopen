const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  for (const blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
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
