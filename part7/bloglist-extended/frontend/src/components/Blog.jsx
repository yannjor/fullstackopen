import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import Togglable from "./Togglable";

import { likeBlog, removeBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} {blog.author}
      <Togglable buttonLabel="View" hideLabel="Hide">
        <p>{blog.url}</p>
        <p>
          Likes: {blog.likes}
          <button
            className="likeButton"
            onClick={(event) => {
              event.preventDefault();
              dispatch(likeBlog(blog));
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
              if (window.confirm(`Remove post ${blog.title}?`)) {
                dispatch(removeBlog(blog));
                dispatch(setNotification("Blogpost successfully removed"));
              }
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
};

export default Blog;
