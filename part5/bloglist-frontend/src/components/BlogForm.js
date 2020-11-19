import React, { useState } from "react";

const BlogForm = ({ addBlogPost }) => {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostAuthor, setNewPostAuthor] = useState("");
  const [newPostUrl, setNewPostUrl] = useState("");

  const handlePost = (event) => {
    event.preventDefault();
    addBlogPost({
      title: newPostTitle,
      author: newPostAuthor,
      url: newPostUrl
    });
    setNewPostTitle("");
    setNewPostAuthor("");
    setNewPostUrl("");
  };

  return (
    <>
      <h2>Add new blogpost</h2>
      <form onSubmit={handlePost}>
        <div>
          Title:
          <input
            type="text"
            name="Title"
            value={newPostTitle}
            onChange={(event) => setNewPostTitle(event.target.value)}
          ></input>
        </div>
        <div>
          Author:
          <input
            type="text"
            name="Author"
            value={newPostAuthor}
            onChange={(event) => setNewPostAuthor(event.target.value)}
          ></input>
        </div>
        <div>
          Url:
          <input
            type="url"
            name="Url"
            value={newPostUrl}
            onChange={(event) => setNewPostUrl(event.target.value)}
          ></input>
        </div>
        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default BlogForm;
