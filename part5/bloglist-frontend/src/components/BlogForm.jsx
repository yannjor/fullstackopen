import { useState } from "react";

const BlogForm = ({ handleAddBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div>
      <h2>Create new</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleAddBlog(title, author, url);
          setTitle("");
          setAuthor("");
          setUrl("");
        }}
      >
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            className="titleInput"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            className="authorInput"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="url"
            value={url}
            name="Url"
            className="urlInput"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
