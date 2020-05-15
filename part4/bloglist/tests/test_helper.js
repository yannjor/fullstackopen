const Blog = require("../models/blog");
const User = require("../models/user");

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

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  usersInDb,
  initialBlogs,
  blogsInDb,
};
