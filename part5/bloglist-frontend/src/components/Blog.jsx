import { useState } from "react";
import PropTypes from "prop-types";

import Togglable from "./Togglable";

const Blog = ({ blog, user, removeBlog, incrementLikes }) => {
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="View" hideLabel="Hide">
        <p>{blog.url}</p>
        <p>
          Likes: {likes}
          <button
            className="likeButton"
            onClick={(event) => {
              event.preventDefault();
              incrementLikes(blog);
              setLikes(likes + 1);
            }}
          >
            Like
          </button>
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
  incrementLikes: PropTypes.func.isRequired,
};

export default Blog;
