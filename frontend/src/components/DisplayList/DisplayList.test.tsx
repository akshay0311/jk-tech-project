import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DisplayList from "./DisplayList";

describe("DisplayList Component", () => {
  const mockHandleDelete = jest.fn();
  const mockHandleOpen = jest.fn();
  const mockRedirectToPostDetail = jest.fn();

  const posts = [
    { id: 1, title: "Post 1", content: "Content for post 1", author: "Author 1", date: "2024-02-07" },
    { id: 2, title: "Post 2", content: "Content for post 2", author: "Author 2", date: "2024-02-07" },
  ];

  test("renders the correct number of posts", () => {
    render(
      <DisplayList
        posts={posts}
        handleDelete={mockHandleDelete}
        handleOpen={mockHandleOpen}
        redirectToPostDetail={mockRedirectToPostDetail}
      />
    );

    // Check if both posts are rendered
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Post 2")).toBeInTheDocument();
  });

  test("calls redirectToPostDetail when a post is clicked", () => {
    render(
      <DisplayList
        posts={posts}
        handleDelete={mockHandleDelete}
        handleOpen={mockHandleOpen}
        redirectToPostDetail={mockRedirectToPostDetail}
      />
    );

    const firstPost = screen.getByText("Post 1");
    fireEvent.click(firstPost);

    expect(mockRedirectToPostDetail).toHaveBeenCalledWith("1");
  });

  test("calls handleOpen when the edit button is clicked", () => {
    render(
      <DisplayList
        posts={posts}
        handleDelete={mockHandleDelete}
        handleOpen={mockHandleOpen}
        redirectToPostDetail={mockRedirectToPostDetail}
      />
    );

    const editButton = screen.getAllByText("Edit")[0]; // Select the first edit button
    fireEvent.click(editButton);

    expect(mockHandleOpen).toHaveBeenCalledWith(posts[0]);
  });

  test("calls handleDelete when the delete button is clicked", () => {
    render(
      <DisplayList
        posts={posts}
        handleDelete={mockHandleDelete}
        handleOpen={mockHandleOpen}
        redirectToPostDetail={mockRedirectToPostDetail}
      />
    );

    const deleteButton = screen.getAllByText("Delete")[0]; // Select the first delete button
    fireEvent.click(deleteButton);

    expect(mockHandleDelete).toHaveBeenCalledWith(1);
  });

  test("renders empty state when no posts exist", () => {
    render(
      <DisplayList
        posts={[]}
        handleDelete={mockHandleDelete}
        handleOpen={mockHandleOpen}
        redirectToPostDetail={mockRedirectToPostDetail}
      />
    );

    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
  });
});
