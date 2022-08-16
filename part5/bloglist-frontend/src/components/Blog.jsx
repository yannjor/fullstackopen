import { useState } from "react";
import PropTypes from "prop-types";

import Togglable from "./Togglable";

import blogService from "../services/blogs";

const Blog = ({ blog, user, removeBlog }) => {
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const incrementLikes = async () => {
    await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    setLikes(likes + 1);
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="View" hideLabel="Hide">
        <p>{blog.url}</p>
        <p>
          Likes: {likes} <button onClick={incrementLikes}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username && (
          <button
            onClick={(event) => {
              event.preventDefault();
              removeBlog(blog);
            }}
          >
            Remove
          </button>
        )}
      </Togglable>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
