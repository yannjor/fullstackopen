const blogsRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

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

blogsRouter.post("/", async (request, response) => {
  const { body, token } = request;
  if (!token) {
    return response.status(401).json({ error: "auth token missing" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "invalid auth token" });
  }

  try {
    const user = await User.findById(decodedToken.id);
    const blog = new Blog({
      ...body,
      likes: body.likes ? body.likes : 0,
      user: user._id
    });
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    response.status(201).json(savedBlog.toJSON());
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    response.json(updatedBlog.toJSON());
  } catch (err) {
    response.status(400).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  if (!request.token) {
    return response.status(401).json({ error: "auth token missing" });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  if (blog.user.toString() === user.id.toString()) {
    await blog.deleteOne();
    return response.status(204).end();
  }
  return response.status(401).end();
});

module.exports = blogsRouter;
