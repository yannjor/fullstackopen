const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Hello world",
    author: "Pelle",
    url: "https://example.org",
    likes: 69,
  },
  {
    title: "Another blogpost",
    author: "Kalle",
    url: "https://test.com",
    likes: 420,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
