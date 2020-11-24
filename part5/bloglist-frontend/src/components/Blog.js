import React, { useState } from "react";

const Blog = ({ blog, user, incrementLikes, removeBlogPost }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const handleRemove = (event) => {
    event.preventDefault();
    removeBlogPost(blog);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    incrementLikes(blog);
    setLikes(likes + 1);
  };

  return (
    <div style={blogStyle}>
      {visible ? (
        <div>
          {blog.title}
          <button onClick={() => setVisible(!visible)}>Hide</button>
          <p>{blog.url}</p>
          <p>
            Likes: {likes}{" "}
            <button onClick={handleUpdate} className="likeButton">
              Like
            </button>
          </p>
          <p>{blog.author}</p>
          {user.username === blog.user.username && (
            <button onClick={handleRemove}>Remove</button>
          )}
        </div>
      ) : (
        <div>
          {blog.title} - {blog.author}
          <button onClick={() => setVisible(!visible)}>Show</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
