const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const { body } = request;
  if (!body.title || !body.url) {
    return response.status(400).end();
  }

  body.likes = !body.likes ? 0 : body.likes;

  const blog = new Blog(body);
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog.toJSON());
});

module.exports = blogsRouter;
