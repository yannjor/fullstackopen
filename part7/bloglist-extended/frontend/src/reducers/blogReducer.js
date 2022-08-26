import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    add(state, action) {
      const blog = action.payload;
      state.push(blog);
    },
    set(state, action) {
      return action.payload;
    },
    like(state, action) {
      const id = action.payload;
      const blog = state.find((b) => b.id === id);
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      return state.map((b) => (b.id === id ? updatedBlog : b));
    },
    remove(state, action) {
      const id = action.payload;
      return state.filter((b) => b.id !== id);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(set(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(add(newBlog));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.update(blog.id, {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    dispatch(like(blog.id));
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id);
    dispatch(remove(blog.id));
  };
};

export const { add, set, like, remove } = blogSlice.actions;
export default blogSlice.reducer;
