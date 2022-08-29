import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import Users from "./components/Users";

import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs, createBlog } from "./reducers/blogReducer";
import { initializeUser, logOutUser } from "./reducers/userReducer";

const App = () => {
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogFormRef = useRef();

  const addBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog({ title, author, url, user }));
    dispatch(setNotification(`Added new blog "${title}" by ${author}`));
  };

  return (
    <div>
      <Notification />
      {!user ? (
        <LoginForm />
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in
            <button onClick={() => dispatch(logOutUser())}>Log out</button>
          </p>
          <Routes>
            <Route
              path="/"
              element={
                <div>
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
              }
            />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
