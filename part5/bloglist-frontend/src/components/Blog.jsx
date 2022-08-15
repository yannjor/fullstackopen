import { useState } from "react";

import Togglable from "./Togglable";

import blogService from "../services/blogs";

const Blog = ({ blog }) => {
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
      </Togglable>
    </div>
  );
};

export default Blog;
