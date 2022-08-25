import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

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

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", true));
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
    dispatch(setNotification(`Added new blog "${title}" by ${author}`));
  };

  const removeBlog = async (blogPost) => {
    try {
      if (window.confirm(`Remove post ${blogPost.title}?`)) {
        await blogService.remove(blogPost.id);
        setBlogs(blogs.filter((blog) => blog !== blogPost));
        dispatch(setNotification("Blogpost successfully removed"));
      }
    } catch (exception) {
      console.error(exception);
      dispatch(setNotification("Failed to remove blogpost", true));
    }
  };

  const incrementLikes = async (blog) => {
    await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <Notification />
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
              incrementLikes={incrementLikes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
