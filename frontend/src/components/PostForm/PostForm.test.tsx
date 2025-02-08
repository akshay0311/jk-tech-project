import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PostForm from "./PostForm";

describe("PostForm Component", () => {
  const mockHandleChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  const form = {
    title: "",
    content: "",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form correctly", () => {
    render(
      <PostForm form={form} handleChange={mockHandleChange} handleSubmit={mockHandleSubmit} />
    );

    expect(screen.getByText("Add New Post")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Content")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  test("calls handleChange when input fields change", () => {
    render(
      <PostForm form={form} handleChange={mockHandleChange} handleSubmit={mockHandleSubmit} />
    );

    const titleInput = screen.getByLabelText("Title");
    const contentInput = screen.getByLabelText("Content");

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(contentInput, { target: { value: "New Content" } });

    expect(mockHandleChange).toHaveBeenCalledTimes(2);
  });

  test("calls handleSubmit when the form is submitted", () => {
    render(
      <PostForm form={form} handleChange={mockHandleChange} handleSubmit={mockHandleSubmit} />
    );

    fireEvent.submit(screen.getByRole("form"));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  test("cancel button is present but does not trigger handleSubmit", () => {
    render(
      <PostForm form={form} handleChange={mockHandleChange} handleSubmit={mockHandleSubmit} />
    );

    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);

    expect(mockHandleSubmit).not.toHaveBeenCalled();
  });
});
