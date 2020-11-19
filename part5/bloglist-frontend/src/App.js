import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notificationMsg, setNotificationMsg] = useState(null);
  const [blogFormVisible, setBlogFormVisible] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const clearNotification = (time) => {
    setTimeout(() => {
      setNotificationMsg(null);
    }, time);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      setNotificationMsg({
        message: "Wrong username or password",
        error: true
      });
      clearNotification(5000);
    }
    setUsername("");
    setPassword("");
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
    blogService.setToken(null);
  };

  const addBlogPost = async (blogPost) => {
    try {
      const newPost = await blogService.post(blogPost);
      setBlogs(blogs.concat(newPost));
      setNotificationMsg({
        message: `Blogpost ${newPost.title} successfully added`,
        error: false
      });
      clearNotification(5000);
      setBlogFormVisible(false);
    } catch (exception) {
      setNotificationMsg({
        message: `Failed to add blogpost`,
        error: true
      });
      clearNotification(5000);
      console.error(exception);
    }
  };

  const removeBlogPost = async (blogPost) => {
    try {
      if (window.confirm(`Remove post ${blogPost.title}?`)) {
        await blogService.remove(blogPost.id);
        setBlogs(blogs.filter((blog) => blog !== blogPost));
        setNotificationMsg({
          message: "Blogpost successfully removed",
          error: false
        });
        clearNotification(5000);
      }
    } catch (exception) {
      console.error(exception);
      setNotificationMsg({
        message: "Failed to remove blogpost",
        error: true
      });
      clearNotification(5000);
    }
  };

  if (!user) {
    return (
      <>
        <Notification message={notificationMsg} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </>
    );
  }

  const hideWhenVisible = { display: blogFormVisible ? "none" : "" };
  const showWhenVisible = { display: blogFormVisible ? "" : "none" };

  const toggleVisibility = () => {
    setBlogFormVisible(!blogFormVisible);
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMsg} />
      <p>
        {user.name} logged in{" "}
        <button onClick={(event) => handleLogout(event)}>Log out</button>
      </p>
      <button style={hideWhenVisible} onClick={toggleVisibility}>
        New post
      </button>
      <div style={showWhenVisible}>
        <BlogForm addBlogPost={addBlogPost} />
      </div>
      <button style={showWhenVisible} onClick={toggleVisibility}>
        Cancel
      </button>

      {blogs
        .sort((blog) => !blog.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            removeBlogPost={removeBlogPost}
          />
        ))}
    </div>
  );
};

export default App;
