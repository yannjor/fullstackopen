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
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");
  const [newPostUrl, setNewPostUrl] = useState("");
  const [notificationMsg, setNotificationMsg] = useState(null);

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
      console.log(user);
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

  const handlePost = async (event) => {
    event.preventDefault();
    try {
      const newPost = await blogService.post({
        title: newPostTitle,
        author: newPostAuthor,
        url: newPostUrl
      });
      setBlogs(blogs.concat(newPost));
      setNotificationMsg({
        message: `Blogpost ${newPost.title} successfully added`,
        error: false
      });
      clearNotification(5000);
    } catch (exception) {
      console.error(exception);
    }
    setNewPostTitle("");
    setNewPostAuthor("");
    setNewPostUrl("");
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

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMsg} />
      <p>
        {user.name} logged in{" "}
        <button onClick={(event) => handleLogout(event)}>Log out</button>
      </p>
      <BlogForm
        newPostTitle={newPostTitle}
        newPostAuthor={newPostAuthor}
        newPostUrl={newPostUrl}
        setNewPostTitle={setNewPostTitle}
        setNewPostAuthor={setNewPostAuthor}
        setNewPostUrl={setNewPostUrl}
        handlePost={handlePost}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
