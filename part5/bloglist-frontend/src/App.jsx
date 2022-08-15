import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const timeout = () => {
    setTimeout(() => {
      setNotification(null);
      setError(false);
    }, 5000);
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (error) {
      setNotification("Wrong username or password");
      setError(true);
      timeout();
      console.error(error);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
  };

  const handleAddBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create({ title, author, url });
    setBlogs(blogs.concat(returnedBlog));
    setNotification(`Added new blog "${title}" by ${author}`);
    timeout();
  };

  return (
    <div>
      <Notification message={notification} error={error} />
      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>Log out</button>
          </p>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm handleAddBlog={handleAddBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
