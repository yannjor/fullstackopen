import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "../components/Blog";

describe("blog component", () => {
  const blog = {
    title: "Test blog",
    author: "Pelle",
    url: "http://test.com",
    likes: 0,
    user: { username: "pelle" },
  };

  const user = {
    username: "pelle",
  };

  let component;
  beforeEach(
    () =>
      (component = render(
        <Blog
          blog={blog}
          user={user}
          removeBlog={() => {}}
          incrementLikes={() => {}}
        />
      ))
  );

  test("renders blog title and author by default but not url or likes", () => {
    expect(component.container).toHaveTextContent(blog.title);
    expect(component.container).toHaveTextContent(blog.author);
    expect(component.queryByText(blog.url)).toBeNull();
    expect(component.queryByText(`Likes: ${blog.likes}`)).toBeNull();
  });

  test("blog url and likes are shown when button is clicked", () => {
    const button = component.container.querySelector("button");
    fireEvent.click(button);
    expect(component.container).toHaveTextContent(blog.url);
    expect(component.container).toHaveTextContent(`Likes: ${blog.likes}`);
  });

  test("clicking like button twice calls event handler twice", () => {
    const mockHandler = jest.fn();
    component = render(
      <Blog
        blog={blog}
        user={user}
        removeBlog={() => {}}
        incrementLikes={mockHandler}
      />
    );
    const showButton = component.container.querySelector("button");
    fireEvent.click(showButton);
    const likeButton = component.container.querySelector(".likeButton");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
