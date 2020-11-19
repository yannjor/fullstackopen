import React, { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";

const Blog = ({ blog, user, removeBlogPost }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const incrementLikes = (event) => {
    event.preventDefault();
    try {
      blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
      });
      setLikes(likes + 1);
    } catch (exception) {
      console.error(exception);
    }
  };

  const handleRemove = (event) => {
    event.preventDefault();
    removeBlogPost(blog);
  };

  return (
    <div style={blogStyle}>
      {visible ? (
        <div>
          {blog.title}
          <button onClick={() => setVisible(!visible)}>Hide</button>
          <p>{blog.url}</p>
          <p>
            Likes: {likes} <button onClick={incrementLikes}>Like</button>
          </p>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button onClick={handleRemove}>Remove</button>
          )}
        </div>
      ) : (
        <div>
          {blog.title}
          <button onClick={() => setVisible(!visible)}>Show</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  removeBlogPost: PropTypes.func.isRequired
};

export default Blog;
