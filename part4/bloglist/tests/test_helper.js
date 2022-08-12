const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Hello world",
    author: "Pelle",
    url: "https://example.org",
    likes: 69,
  },
  {
    title: "Another blogpost",
    author: "Pelle",
    url: "https://test.com",
    likes: 420,
  },
];

const initialUser = {
  username: "pelle",
  password: "hemlig",
  name: "Pelle",
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  initialUser,
  blogsInDb,
  usersInDb,
};
