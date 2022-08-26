import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";

const App = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );

  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

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
    dispatch(createBlog({ title, author, url, user }));
    dispatch(setNotification(`Added new blog "${title}" by ${author}`));
  };

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
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
