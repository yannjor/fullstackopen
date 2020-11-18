import React from "react";

const BlogForm = ({
  newPostTitle,
  newPostAuthor,
  newPostUrl,
  setNewPostTitle,
  setNewPostAuthor,
  setNewPostUrl,
  handlePost
}) => {
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
