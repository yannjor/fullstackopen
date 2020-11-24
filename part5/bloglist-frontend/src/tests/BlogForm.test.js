import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "../components/BlogForm";

test("BlogForm calls eventhandler with right details when submitted", () => {
  const addBlog = jest.fn();
  const component = render(<BlogForm addBlogPost={addBlog} />);
  const titleInput = component.container.querySelector(".titleInput");
  const authorInput = component.container.querySelector(".authorInput");
  const urlInput = component.container.querySelector(".urlInput");
  fireEvent.change(titleInput, { target: { value: "Test title" } });
  fireEvent.change(authorInput, { target: { value: "Test author" } });
  fireEvent.change(urlInput, { target: { value: "http://test.com" } });
  const form = component.container.querySelector("form");
  fireEvent.submit(form);
  expect(addBlog.mock.calls).toHaveLength(1);
  expect(addBlog.mock.calls[0][0].title).toBe("Test title");
  expect(addBlog.mock.calls[0][0].author).toBe("Test author");
  expect(addBlog.mock.calls[0][0].url).toBe("http://test.com");
});
