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
    } catch (exception) {
      setNotification("Wrong username or password");
      setError(true);
      timeout();
      console.error(exception);
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setUser(null);
    window.localStorage.clear();
  };

  const addBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create({ title, author, url });
    setBlogs(blogs.concat(returnedBlog));
    setNotification(`Added new blog "${title}" by ${author}`);
    timeout();
  };

  const removeBlog = async (blogPost) => {
    try {
      if (window.confirm(`Remove post ${blogPost.title}?`)) {
        await blogService.remove(blogPost.id);
        setBlogs(blogs.filter((blog) => blog !== blogPost));
        setNotification("Blogpost successfully removed");
      }
    } catch (exception) {
      console.error(exception);
      setNotification("Failed to remove blogpost");
      setError(true);
    } finally {
      timeout();
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

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
          <Togglable
            buttonLabel="New blog"
            hideLabel="Cancel"
            ref={blogFormRef}
          >
            <BlogForm handleAddBlog={addBlog} />
          </Togglable>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
