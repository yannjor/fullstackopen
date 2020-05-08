const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const logger = require("../utils/logger");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (err) {
    logger.error(err);
  }
});

module.exports = blogsRouter;
