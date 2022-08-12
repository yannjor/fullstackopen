const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");

const Blog = require("../models/blog");
const User = require("../models/user");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
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

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { body, user } = request;
  if (!body.title || !body.url) {
    return response.status(400).end();
  }
  const blog = new Blog({
    ...body,
    likes: body.likes ? body.likes : 0,
    user: user._id,
  });
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const { params, user } = request;
  const blog = await Blog.findById(params.id);
  if (blog.user.toString() !== user.id.toString()) {
    return response
      .status(401)
      .json({ error: "only the user who added the blog can delete it" });
  }
  await blog.deleteOne();
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
